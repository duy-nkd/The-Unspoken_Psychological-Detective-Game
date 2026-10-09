/**
 * Lời thoại DEMO chỉ để xem thử nhân vật nửa thân + nhép miệng (DebugScene, phím F9).
 * KHÔNG phải kịch bản — lời thoại thật nằm trong public/assets/dialogues/ (chờ ISS-07).
 * Định dạng câu thoại: xem data/characters.js.
 */
export const PORTRAIT_DEMO_LINES = Object.freeze([
  {
    speaker: 'Ông chủ trọ',
    text: '[DEMO] Đứng bên phải, kiểu nhép "smug". Gặp dấu phẩy, dấu chấm thì miệng dừng.',
    character: 'landlord',
    expression: 'smirk',
    talk: 'smug',
    position: 'right',
  },
  {
    speaker: 'Thám tử',
    text: '[DEMO] Câu của người khác: chủ trọ vẫn đứng đó nhưng tối đi.',
  },
  {
    speaker: 'Ông chủ trọ',
    text: '[DEMO] Chuyển sang bên trái, cau mày, kiểu nhép "normal". Bấm khi chữ đang chạy để hiện hết câu!',
    character: 'landlord',
    expression: 'stern',
    talk: 'normal',
    position: 'left',
  },
  {
    speaker: 'Ông chủ trọ',
    text: '[DEMO] Câu không có "talk": đứng yên, không nhép miệng.',
    character: 'landlord',
    expression: 'smirk',
    position: 'left',
  },
])
