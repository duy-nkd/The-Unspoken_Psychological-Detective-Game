import { testCondition } from './expr'
import { cloneJson, getPath, setPath } from './statePath'

export function deductionSlots(graph, context) {
  const { cards, sourceCards, slots, groups, evidenceRoles } = graph.deduction
  return slots.map(({ id, statePath, accepts }) => {
    const groupId = id.toUpperCase()
    const choices = accepts === 'source' ? sourceCards : cards[groupId]
    return {
      id,
      text:
        accepts === 'source'
          ? evidenceRoles.find((role) => id === `evidence/${role.id}`).text
          : groups.find((group) => group.id === groupId).text,
      value: getPath(context.state, statePath),
      cards: choices
        .filter((card) => testCondition(card.conditions, context, graph.predicates))
        .map(({ id, text }) => ({ id, text })),
    }
  })
}

export function editDeduction(graph, context, slotId, cardId) {
  const slot = deductionSlots(graph, context).find(({ id }) => id === slotId)
  if (!slot || (cardId !== null && !slot.cards.some(({ id }) => id === cardId))) return null
  const { statePath } = graph.deduction.slots.find(({ id }) => id === slotId)
  const state = cloneJson(context.state)
  setPath(state, statePath, cardId)
  return state
}
