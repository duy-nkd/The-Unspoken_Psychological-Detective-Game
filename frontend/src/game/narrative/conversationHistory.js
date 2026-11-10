const CONVERSATION_ENDS = new Set([
  'P1_HUB_MENU',
  'P2_ROOM_UI',
  'P3_HUB',
  'FD_BOARD',
  'FD_HANDOFF_MENU',
  'P4_HUB',
  'CH2_ENTRY',
])

/** Chỉ lưu câu người chơi đã đọc qua. Đóng đoạn khi quay lại điểm điều tra hoặc sang cảnh mới. */
export function rememberDialogue(state, node) {
  if (node.type !== 'dialogue') return state
  const draft = state.conversation_draft ?? []
  return {
    ...state,
    conversation_draft: [...draft, { speaker: node.speaker, text: node.text }],
  }
}

export function finishConversation(state) {
  const draft = state.conversation_draft
  if (!CONVERSATION_ENDS.has(state.current_node) || !draft?.length) return state
  return {
    ...state,
    conversation_draft: [],
    conversation_history: [...(state.conversation_history ?? []), draft],
  }
}
