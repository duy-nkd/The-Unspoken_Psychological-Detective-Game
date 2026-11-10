import { testCondition } from './expr'

export function availableStatements(node, state) {
  const ids = node?.statementIds ?? node?.statementRules ?? []
  return ids.filter((id) => Object.hasOwn(state.statements, id)).map((id) => state.statements[id])
}

export function resolvePress(graph, node, context, statementId) {
  const rule = activeRule(graph, node, context, statementId)
  if (!context.state.flags.press_unlocked) return null
  return (
    rule?.press?.routes.find((route) =>
      testCondition(route.conditions, context, graph.predicates),
    ) ?? null
  )
}

export function canPresent(graph, node, context, statementId) {
  const rule = activeRule(graph, node, context, statementId)?.present
  return (
    node?.type === 'cross_examination' &&
    context.state.flags.present_unlocked &&
    rule?.enabled === true &&
    testCondition(rule.condition, context, graph.predicates)
  )
}

export function resolvePresent(graph, node, context, statementId, evidenceId) {
  if (!canPresent(graph, node, context, statementId)) return null
  const { evidence_collected: collected, evidence_records: records } = context.state
  if (!collected.includes(evidenceId) || !Object.hasOwn(records, evidenceId)) return null
  const rule = graph.statementRules[statementId].present
  return (
    rule.routes.find(
      (route) =>
        route.evidenceId === evidenceId &&
        testCondition(route.condition, context, graph.predicates),
    ) ?? null
  )
}

function activeRule(graph, node, context, statementId) {
  if (!['cross_examination', 'notebook_view'].includes(node?.type)) return null
  if (!node.statementRules?.includes(statementId)) return null
  if (!Object.hasOwn(context.state.statements, statementId)) return null
  const rule = graph.statementRules[statementId]
  return rule && testCondition(rule.condition, context, graph.predicates) ? rule : null
}
