/**
 * Danh mục nhân vật — NƠI DUY NHẤT khai báo ảnh nửa thân + hoạt ảnh nhép miệng.
 *
 * Thêm nhân vật mới:
 *   1. Chép ảnh NỬA THÂN TRÊN (nền trong suốt, cùng khung hình cho mọi biểu cảm) vào
 *      public/assets/images/characters/<id>-<biểu cảm>.webp
 *   2. Thêm một mục vào CHARACTERS bên dưới.
 *   PreloadScene tự nạp ảnh + tạo hoạt ảnh; DialogueScene tự đưa nhân vật lên sân khấu.
 *
 * Câu thoại có nhân vật đứng trên sân khấu (bên trái/phải màn hình):
 *   { "speaker": "Ông chủ trọ", "text": "...",
 *     "character": "landlord", "expression": "smirk", "talk": "smug", "position": "right" }
 *   - character  : id trong CHARACTERS
 *   - expression : biểu cảm đứng yên (thiếu -> defaultExpression)
 *   - talk       : kiểu nhép miệng khi chữ đang chạy (thiếu -> không nhép)
 *   - position   : "left" | "right" (thiếu -> defaultSide)
 */

export const SPRITE_DIR = 'assets/images/characters'
export const STAGE_SIDES = Object.freeze(['left', 'right'])

export const spriteKey = (characterId, expression) => `char-${characterId}-${expression}`
export const spriteUrl = (characterId, expression) =>
  `${SPRITE_DIR}/${characterId}-${expression}.webp`
export const talkAnimKey = (characterId, mood) => `talk-${characterId}-${mood}`

export const CHARACTERS = Object.freeze({
  landlord: Object.freeze({
    id: 'landlord',
    // Story.txt Chương 1 chỉ gọi "ông chủ trọ" — tài liệu chưa có tên riêng.
    name: 'Ông chủ trọ',
    // smirk = cười nhếch, miệng khép · stern = cau mày, miệng hé · talk = miệng mở
    expressions: Object.freeze(['smirk', 'stern', 'talk']),
    defaultExpression: 'smirk',
    defaultSide: 'right',
    // TẠM: tốc độ nhép miệng là thông số kỹ thuật, tài liệu chưa quy định.
    talk: Object.freeze({
      normal: Object.freeze({ frames: Object.freeze(['stern', 'talk']), frameRate: 7 }),
      smug: Object.freeze({ frames: Object.freeze(['smirk', 'talk']), frameRate: 6 }),
    }),
  }),
})

/**
 * Xếp ảnh nửa thân của mọi nhân vật vào hàng đợi nạp.
 * @param {Phaser.Loader.LoaderPlugin} load
 */
export function loadCharacterAssets(load, characters = CHARACTERS) {
  for (const character of Object.values(characters)) {
    for (const expression of character.expressions) {
      load.image(spriteKey(character.id, expression), spriteUrl(character.id, expression))
    }
  }
}

/**
 * Tạo hoạt ảnh nhép miệng (gọi một lần sau khi ảnh đã nạp). Bỏ qua key đã tồn tại.
 * @param {Phaser.Animations.AnimationManager} anims
 * @returns {string[]} các key đã tạo
 */
export function registerCharacterAnimations(anims, characters = CHARACTERS) {
  const created = []
  for (const character of Object.values(characters)) {
    for (const [mood, { frames, frameRate }] of Object.entries(character.talk ?? {})) {
      const key = talkAnimKey(character.id, mood)
      if (anims.exists(key)) continue
      anims.create({
        key,
        frames: frames.map((expression) => ({ key: spriteKey(character.id, expression) })),
        frameRate,
        repeat: -1,
      })
      created.push(key)
    }
  }
  return created
}

/**
 * Câu thoại -> thông tin dựng nhân vật trên sân khấu. Logic thuần, không cần Phaser.
 * @returns {null | { characterId, name, expression, side, textureKey, talkAnim }}
 *   null khi câu thoại không có nhân vật (hoặc id không tồn tại).
 */
export function resolveStageLine(line, characters = CHARACTERS) {
  const character = line?.character ? characters[line.character] : null
  if (!character) return null
  const expression = character.expressions.includes(line.expression)
    ? line.expression
    : character.defaultExpression
  const side = STAGE_SIDES.includes(line.position) ? line.position : character.defaultSide
  const talkAnim =
    line.talk && character.talk?.[line.talk] ? talkAnimKey(character.id, line.talk) : null
  return {
    characterId: character.id,
    name: character.name,
    expression,
    side,
    textureKey: spriteKey(character.id, expression),
    talkAnim,
  }
}
