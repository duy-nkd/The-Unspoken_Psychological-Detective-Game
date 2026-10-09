/**
 * Bảng màu + kiểu chữ dùng trong canvas. Đổi giao diện game = sửa file này.
 * (Giá trị kỹ thuật tạm — tài liệu chưa quy định art direction.)
 */
export const COLORS = Object.freeze({
  background: 0x17151b,
  panel: 0x241f2b,
  panelBorder: 0x5c5266,
  accent: 0xf2b84b,
  danger: 0xd9534f,
  textHex: '#f4efe6',
  mutedHex: '#a89f94',
  accentHex: '#f2b84b',
})

export const FONT_FAMILY = 'system-ui, "Segoe UI", Roboto, sans-serif'

export const TEXT_STYLES = Object.freeze({
  title: { fontFamily: FONT_FAMILY, fontSize: '56px', color: COLORS.textHex },
  heading: { fontFamily: FONT_FAMILY, fontSize: '28px', color: COLORS.textHex },
  body: { fontFamily: FONT_FAMILY, fontSize: '22px', color: COLORS.textHex },
  small: { fontFamily: FONT_FAMILY, fontSize: '16px', color: COLORS.mutedHex },
  button: { fontFamily: FONT_FAMILY, fontSize: '28px', color: COLORS.textHex },
})

/** Thứ tự lớp vẽ (depth) — tránh số cứng rải rác. */
export const DEPTH = Object.freeze({
  BACKGROUND: 0,
  HOTSPOT: 10,
  HUD: 100,
  CHARACTER: 150, // nhân vật nửa thân (CharacterStage) — sau khung thoại
  OVERLAY: 200,
  DEBUG: 1000,
})
