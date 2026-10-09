import { describe, expect, it } from 'vitest'
import {
  CHARACTERS,
  loadCharacterAssets,
  registerCharacterAnimations,
  resolveStageLine,
  spriteKey,
  talkAnimKey,
} from './characters'

describe('characters — danh mục nhân vật', () => {
  it('nạp đủ ảnh nửa thân của chủ trọ', () => {
    const queued = []
    loadCharacterAssets({ image: (key, url) => queued.push([key, url]) })
    expect(queued).toEqual([
      ['char-landlord-smirk', 'assets/images/characters/landlord-smirk.webp'],
      ['char-landlord-stern', 'assets/images/characters/landlord-stern.webp'],
      ['char-landlord-talk', 'assets/images/characters/landlord-talk.webp'],
    ])
  })

  it('mọi khung hình nhép miệng đều là biểu cảm đã khai báo', () => {
    for (const character of Object.values(CHARACTERS)) {
      expect(character.expressions.includes(character.defaultExpression)).toBe(true)
      for (const { frames } of Object.values(character.talk)) {
        for (const frame of frames) expect(character.expressions.includes(frame)).toBe(true)
      }
    }
  })

  it('tạo hoạt ảnh lặp vô hạn và không tạo trùng', () => {
    const store = new Map()
    const anims = { exists: (key) => store.has(key), create: (cfg) => store.set(cfg.key, cfg) }
    expect(registerCharacterAnimations(anims)).toEqual([
      talkAnimKey('landlord', 'normal'),
      talkAnimKey('landlord', 'smug'),
    ])
    expect(store.get('talk-landlord-normal').frames).toEqual([
      { key: spriteKey('landlord', 'stern') },
      { key: spriteKey('landlord', 'talk') },
    ])
    expect(store.get('talk-landlord-normal').repeat).toBe(-1)
    expect(registerCharacterAnimations(anims)).toEqual([])
  })
})

describe('resolveStageLine — câu thoại -> sân khấu', () => {
  it('đủ trường', () => {
    const stage = resolveStageLine({
      character: 'landlord',
      expression: 'stern',
      talk: 'normal',
      position: 'left',
    })
    expect(stage).toEqual({
      characterId: 'landlord',
      name: 'Ông chủ trọ',
      expression: 'stern',
      side: 'left',
      textureKey: 'char-landlord-stern',
      talkAnim: 'talk-landlord-normal',
    })
  })

  it('thiếu / sai trường thì dùng mặc định, không nhép miệng', () => {
    const stage = resolveStageLine({ character: 'landlord', expression: 'xyz', position: 'top' })
    expect(stage.expression).toBe('smirk')
    expect(stage.side).toBe('right')
    expect(stage.talkAnim).toBe(null)
  })

  it('không có nhân vật hoặc id lạ -> null', () => {
    expect(resolveStageLine({ speaker: 'Hệ thống', text: 'x' })).toBe(null)
    expect(resolveStageLine({ character: 'khong-ton-tai' })).toBe(null)
  })
})
