/** Model đứng riêng cho bản đồ; ba JPG là ảnh người dùng cung cấp (T-076). */
export const NPC_SPRITES = Object.freeze({
  landlord: Object.freeze({
    sourceKey: 'map-npc-source-landlord',
    url: 'assets/images/characters/landlord-standing.png',
  }),
  linh: Object.freeze({
    sourceKey: 'map-npc-source-linh',
    url: 'assets/images/characters/linh-standing.jpg',
  }),
  hao: Object.freeze({
    sourceKey: 'map-npc-source-hao',
    url: 'assets/images/characters/hao-standing.jpg',
  }),
  minh: Object.freeze({
    sourceKey: 'map-npc-source-minh',
    url: 'assets/images/characters/minh-standing.jpg',
  }),
})

export const npcTextureKey = (id) => `map-npc-${id}`

export function loadNpcAssets(load) {
  for (const { sourceKey, url } of Object.values(NPC_SPRITES)) {
    if (url) load.image(sourceKey, url)
  }
}
