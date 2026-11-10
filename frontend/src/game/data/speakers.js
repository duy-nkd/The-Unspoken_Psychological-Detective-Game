import { suspectPortrait } from './suspectPortraits'

const SUSPECT_IDS = { LINH: 'linh', MINH: 'minh', HÀO: 'hao', 'NGƯỜI ĐÀN ÔNG': 'hao' }

const HOA_EXPRESSIONS = {
  Anxious: 'stern',
  Breathless: 'stern',
  Cornered: 'stern',
  Defensive: 'stern',
  Flustered: 'stern',
  Guarded: 'smirk',
  Hasty: 'stern',
  Insistent: 'smirk',
  Irritated: 'stern',
  Panicked: 'stern',
  Puzzled: 'stern',
  Reluctant: 'stern',
  Stalled: 'stern',
  Uneasy: 'stern',
  Worried: 'stern',
}

export function storyLine(node) {
  const text = node.text?.replaceAll('**', '') ?? ''
  const suspect = SUSPECT_IDS[node.speaker]
  if (suspect) {
    return { speaker: node.speaker, text, ...suspectPortrait(suspect, node.expression) }
  }
  if (node.speaker !== 'HÒA') return { speaker: node.speaker, text }
  return {
    speaker: node.speaker,
    text,
    character: 'landlord',
    expression: HOA_EXPRESSIONS[node.expression] ?? 'stern',
    talk: HOA_EXPRESSIONS[node.expression] === 'smirk' ? 'story-smug' : 'story-normal',
  }
}
