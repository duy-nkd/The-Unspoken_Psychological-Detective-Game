// Ô chân dung vuông đọc trực tiếp từ các bảng thiết kế do nhóm cung cấp.
export const SUSPECT_PORTRAITS = {
  linh: {
    frames: {
      neutral: [47, 720, 174, 174],
      guarded: [230, 720, 174, 174],
      startled: [417, 720, 174, 174],
      defensive: [601, 721, 174, 174],
      remorseful: [790, 724, 174, 174],
    },
    fallback: 'neutral',
    expressions: {
      Guarded: 'guarded',
      Wary: 'guarded',
      Controlled: 'guarded',
      Hesitant: 'guarded',
      Shaken: 'startled',
      Puzzled: 'startled',
      Uneasy: 'startled',
      Defensive: 'defensive',
      Insistent: 'defensive',
      Strained: 'defensive',
      Failing: 'remorseful',
      Breaking: 'remorseful',
      Ashamed: 'remorseful',
    },
  },
  minh: {
    frames: {
      grieving: [84, 627, 188, 188],
      evasive: [349, 627, 188, 188],
      defensive: [617, 627, 188, 188],
      alarmed: [883, 627, 188, 188],
      panicked: [1150, 627, 188, 188],
      broken: [1423, 627, 188, 188],
    },
    fallback: 'grieving',
    expressions: {
      Guarded: 'evasive',
      Stalled: 'evasive',
      Wary: 'evasive',
      Defensive: 'defensive',
      Insistent: 'defensive',
      Shaken: 'alarmed',
      Strained: 'panicked',
      Failing: 'broken',
      Breaking: 'broken',
      Exhausted: 'broken',
    },
  },
  hao: {
    frames: {
      neutral: [108, 639, 187, 187],
      appraising: [392, 639, 187, 187],
      dismissive: [642, 639, 187, 187],
      challenging: [898, 639, 187, 187],
      warning: [1155, 639, 187, 187],
      guarded: [1409, 639, 187, 187],
    },
    fallback: 'neutral',
    expressions: {
      Cool: 'appraising',
      Dry: 'dismissive',
      Impatient: 'challenging',
      Warning: 'warning',
      Low: 'warning',
      Guarded: 'guarded',
    },
  },
}

export const suspectPortraitKey = (id) => `chapter1-portrait-${id}`

export function suspectPortrait(id, expression) {
  const { expressions, fallback } = SUSPECT_PORTRAITS[id]
  return { portrait: suspectPortraitKey(id), portraitFrame: expressions[expression] ?? fallback }
}
