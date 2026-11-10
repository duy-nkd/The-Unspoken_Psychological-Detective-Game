import { restoreCheckpoint } from './checkpoints'
import { finishConversation, rememberDialogue } from './conversationHistory'
import { availableStatements, canPresent, resolvePress, resolvePresent } from './crossExam'
import { deductionSlots, editDeduction } from './deduction'
import { commitEvent } from './effects'
import { createContext, testCondition } from './expr'
import { cloneJson } from './statePath'

const AUTOMATIC_TYPES = new Set([
  'router',
  'transition',
  'notebook_update',
  'checkpoint_restore',
  'narration',
  'action',
])
const FINAL_NOTEBOOK_HANDLER = 'commit_ch1_final_notebook'

/**
 * Dừng ở mỗi nút người chơi cần thấy. Một thao tác chỉ công bố state sau khi toàn bộ đường đi
 * qua nút kỹ thuật đã thành công. version gắn với lần hiển thị để UI bỏ qua click đã cũ.
 */
export function createStoryRunner(graph, snapshot, { onChange = () => {} } = {}) {
  const nodes = new Map(graph.nodes.map((node) => [node.id, node]))
  const boundaries = new Set(graph.externalNodes.map(({ id }) => id))
  const handlers = [FINAL_NOTEBOOK_HANDLER]
  let state = cloneJson(snapshot)
  let version = 0
  let locked = false

  const currentNode = () => nodes.get(state.current_node) ?? null
  const context = (draft = state, input) => createContext({ graph, state: draft, input, handlers })
  const allowed = (condition, draft, input) =>
    testCondition(condition, context(draft, input), graph.predicates)

  function nextNode(node, draft, input) {
    const next = Array.isArray(node.next)
      ? node.next.find((route) => allowed(route.conditions, draft, input))?.targetNode
      : node.next
    if (!next) throw new Error(`Nút ${node.id} không có đường đi hợp lệ`)
    return next
  }

  function commit(draft, node, input, penalty = node.credibilityPenalty ?? 0) {
    if (!node.effects?.length && penalty === 0) return draft
    return commitEvent(
      draft,
      { token: `${draft.committed_events.length}:${node.id}`, effects: node.effects, penalty },
      { graph, node: node.id, handlers, input },
    ).state
  }

  function enter(draft, target, input) {
    for (let steps = 0; steps < graph.nodes.length + 1; steps += 1) {
      draft = { ...draft, current_node: target }
      if (boundaries.has(target)) return finishConversation(draft)
      const node = nodes.get(target)
      if (!node) throw new Error(`Không tìm thấy nút kịch bản ${target}`)
      if (!allowed(node.conditions, draft, input)) throw new Error(`Nút chưa mở: ${target}`)
      if (!AUTOMATIC_TYPES.has(node.type)) {
        const record = viewRecord(node, draft)
        if (record === null) throw new Error(`Nút ${target} chưa có bản ghi để xem`)
        return finishConversation(draft)
      }
      if (node.type === 'checkpoint_restore') {
        draft = restoreCheckpoint(draft, node.checkpointId)
        target = draft.current_node
        continue
      }
      if (node.type === 'notebook_update' && node.commitHandlerId !== FINAL_NOTEBOOK_HANDLER) {
        throw new Error(`Handler chưa triển khai: ${node.commitHandlerId}`)
      }
      draft = commit(draft, node, input)
      target = nextNode(node, draft, input)
    }
    throw new Error(`Vòng lặp nút kỹ thuật tại ${target}`)
  }

  function transact(expectedVersion, operation) {
    if (locked || expectedVersion !== version) return false
    locked = true
    try {
      const next = operation()
      if (!next) return false
      const previous = state
      state = next
      version += 1
      onChange(state, previous)
      return true
    } finally {
      locked = false
    }
  }

  function choices(input) {
    const node = currentNode()
    if (!node) return []
    return [...(node.choices ?? []), ...(node.hotspots ?? [])].flatMap((choice, index) =>
      allowed(choice.condition, state, input) ? [{ ...choice, index }] : [],
    )
  }

  if (!boundaries.has(state.current_node)) state = enter(state, state.current_node)

  return {
    get state() {
      return state
    },
    get node() {
      return currentNode()
    },
    get version() {
      return version
    },
    get complete() {
      return boundaries.has(state.current_node)
    },
    get record() {
      return viewRecord(currentNode(), state)
    },
    choices,
    advance(expectedVersion = version) {
      return transact(expectedVersion, () => {
        const node = currentNode()
        if (!node?.next) return null
        const draft = commit(rememberDialogue(state, node), node)
        return enter(draft, nextNode(node, draft))
      })
    },
    choose(index, { version: expectedVersion = version, sourceId } = {}) {
      return transact(expectedVersion, () => {
        const input = sourceId === undefined ? undefined : { sourceId }
        const choice = choices(input).find((item) => item.index === index)
        return choice ? enter(state, choice.targetNode, input) : null
      })
    },
    statements() {
      return availableStatements(currentNode(), state)
    },
    canPress(statementId) {
      return resolvePress(graph, currentNode(), context(), statementId) !== null
    },
    canPresent(statementId) {
      return canPresent(graph, currentNode(), context(), statementId)
    },
    press(statementId, expectedVersion = version) {
      return transact(expectedVersion, () => {
        const route = resolvePress(graph, currentNode(), context(), statementId)
        return route ? enter(state, route.targetNode) : null
      })
    },
    present(statementId, evidenceId, expectedVersion = version) {
      let result = null
      transact(expectedVersion, () => {
        const input = { sourceId: evidenceId }
        const route = resolvePresent(
          graph,
          currentNode(),
          context(state, input),
          statementId,
          evidenceId,
        )
        if (!route) return null
        result = route.result
        const penalty = result === 'blocked' ? 0 : route.credibilityPenalty
        const draft = commit(state, { id: 'present' }, input, penalty)
        return enter(draft, route.targetNode, input)
      })
      return result
    },
    deductionSlots() {
      return currentNode()?.type === 'deduction' ? deductionSlots(graph, context()) : []
    },
    editDeduction(slotId, cardId, expectedVersion = version) {
      return transact(expectedVersion, () =>
        currentNode()?.type === 'deduction'
          ? editDeduction(graph, context(), slotId, cardId)
          : null,
      )
    },
  }
}

function viewRecord(node, state) {
  if (!node || !['record_view', 'source_view'].includes(node.type)) return undefined
  if (node.statementId) return state.statements[node.statementId] ?? null
  if (node.observationId) return state.observations[node.observationId] ?? null
  if (state.evidence_collected.includes(node.evidenceId)) {
    return state.evidence_records[node.evidenceId] ?? null
  }
  return null
}
