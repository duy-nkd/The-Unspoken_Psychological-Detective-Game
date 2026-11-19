function firstSentences(text, count) {
  return (text.match(/[^.!?]+(?:[.!?]+|$)/g) ?? []).slice(0, count).join('').trim()
}

/** Chỉ trích quan sát vật lý đã có; không đưa suy luận P2 vào lần nhìn đầu tiên. */
export function tungObservationText(graph, evidence) {
  const opening = graph?.nodes?.find(({ id }) => id === 'P1_002__005')?.text ?? ''
  const pose = opening.split(/\n\s*\n/).at(-1)
  const neck = evidence?.records?.find(({ id }) => id === 'EV_NeckScratches')?.text ?? ''
  return [firstSentences(pose, 2), firstSentences(neck, 1)].filter(Boolean).join('\n\n')
}
