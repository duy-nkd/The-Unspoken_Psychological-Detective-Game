import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { chapterFileUrl } from '../data/chapters'
import { notebookSourceKey } from '../systems/notebook'
import { createStoryRunner } from './storyRunner'

const load = (name) =>
  JSON.parse(
    readFileSync(new URL(`../../../public/${chapterFileUrl(1, name)}`, import.meta.url), 'utf8'),
  )
const graph = load('graph')
const { initialState } = load('state')

function readThrough(runner) {
  for (let i = 0; i < 150 && runner.node?.next && runner.node.type !== 'checklist'; i += 1) {
    expect(runner.advance()).toBe(true)
  }
  return runner.node?.id
}

function choose(runner, ...targets) {
  for (const target of targets) {
    const option = runner.choices().find(({ targetNode }) => targetNode === target)
    expect(option, `${runner.node?.id} → ${target}`).toBeDefined()
    expect(runner.choose(option.index)).toBe(true)
    readThrough(runner)
  }
}

function press(runner, statement) {
  expect(runner.press(statement)).toBe(true)
  readThrough(runner)
}

function present(runner, statement, evidence) {
  const version = runner.version
  const result = runner.present(statement, evidence, version)
  expect(result).not.toBeNull()
  expect(runner.present(statement, evidence, version)).toBeNull()
  readThrough(runner)
  return result
}

// Lộ trình chính và lộ trình thu nguồn tùy chọn của validate_data.py, qua API người chơi.
function play(optional) {
  const runner = createStoryRunner(graph, initialState)
  expect(readThrough(runner)).toBe('P1_HALL_204')
  expect(runner.choices().map(({ targetNode }) => targetNode)).toEqual(['P1_ENTER_204'])
  choose(runner, 'P1_ENTER_204')
  expect(runner.state.scene_location).toBe('room204')
  expect(runner.state.flags.victim_seen_from_door).toBe(false)
  choose(runner, 'P1_SEE_TUNG')
  expect(runner.state.flags.victim_seen_from_door).toBe(true)
  expect(runner.state.statements).toEqual({})
  expect(runner.state.evidence_collected).toEqual([])
  choose(runner, 'P1_LEAVE_204')
  expect(readThrough(runner)).toBe('P1_HOA_MENU')
  choose(
    runner,
    'P1_HOA_04',
    'P1_LINH_DISPATCH',
    'P1_LINH_04',
    'P1_HAO_DISPATCH',
    'P1_HAO_04',
    'P1_MINH_DISPATCH',
    'P1_MINH_04',
  )
  expect(runner.state.statements).not.toHaveProperty('ST_P1_MINH_WASH')
  expect(runner.state.evidence_collected).toEqual([])
  choose(runner, 'P1_END_CHECK')
  expect(runner.node.id).toBe('P2_ROOM_UI')
  choose(
    runner,
    'P2_WATCH_DISPATCH',
    'P2_RECEIPT_DISPATCH',
    'P2_INHALER_DISPATCH',
    'P2_NECK_DISPATCH',
    'P2_LOCK_DISPATCH',
  )
  expect(runner.state.evidence_collected).toHaveLength(5)
  if (optional) {
    choose(
      runner,
      'P2_TOWEL_DISPATCH',
      'P2_BOX_DISPATCH',
      'P2_SURVEY_DISPATCH',
      'P2_COIN_DISPATCH',
      'P2_COIN_DETAIL',
    )
  }
  choose(runner, 'P2_EXIT_CHECK')
  if (!optional) choose(runner, 'P2_EXIT')
  expect(runner.node.id).toBe('P3_HUB')
  expect(runner.state.checkpoints.ch1_phase3_start.current_node).toBe('P3_ENTRY')
  if (!optional) {
    expect(runner.state.evidence_collected).not.toContain('EV_WetTowel')
    choose(runner, 'P3_ROOM_RETURN', 'P2_TOWEL_DISPATCH', 'P2_BOX_DISPATCH', 'P2_EXIT_CHECK')
  }
  choose(runner, 'P3_MINH_START')
  press(runner, 'ST_P1_MINH_INITIAL')
  expect(runner.state.statements.ST_P1_MINH_WASH.collected_phase).toBe(3)
  expect(present(runner, 'ST_P1_MINH_WASH', 'EV_RentReceipt')).toBe('blocked')
  expect(runner.state.credibility).toBe(100)
  present(runner, 'ST_P1_MINH_WASH', 'EV_WetTowel')
  expect(runner.state.evidence_records.EV_WetTowel.collected_phase).toBe(optional ? 2 : 3)
  expect(notebookSourceKey(runner.state.evidence_records.EV_WetTowel)).toBe(
    'notebook.source.room204Photo',
  )
  present(runner, 'ST_P3_MINH_VISIT_DETAIL', 'EV_Inhaler')
  present(runner, 'ST_P3_MINH_MEDICINE', 'EV_InhalerBox')
  choose(runner, 'P3_HUB', 'P3_HAO_START')
  press(runner, 'ST_P1_HAO_INITIAL')
  expect(runner.canPresent('ST_P1_HAO_INITIAL')).toBe(false)
  choose(runner, 'P3_A3', 'P3_A2', 'P3_203_REQUEST', 'P3_A4', 'P3_LINH_START')
  press(runner, 'ST_P1_LINH_INITIAL')
  present(runner, 'ST_P3_LINH_REPEAT', 'EV_MissingWatch')
  press(runner, 'ST_P3_LINH_WATCH_DEFENSE')
  choose(runner, 'P3_L4', 'P3_HOA_START')
  press(runner, 'ST_P1_HOA_INITIAL')
  expect(present(runner, 'ST_P3_HOA_REPEAT', 'EV_Inhaler')).toBe('wrong')
  expect(runner.state.credibility).toBe(85)
  expect(present(runner, 'ST_P3_HOA_REPEAT', 'EV_LooseLock')).toBe('support')
  expect(runner.state.credibility).toBe(85)
  expect(runner.state.flags.hoa_entry_admitted).toBe(false)
  present(runner, 'ST_P3_HOA_REPEAT', 'EV_RentReceipt')
  expect(runner.state.statements.ST_P3_HOA_REPEAT).toMatchObject({
    status: 'superseded',
    superseded_by: 'ST_P3_HOA_ENTRY',
    revisions: [{ previous: { status: 'claimed' }, source_step: 'P3_H2__COMMIT' }],
  })
  choose(runner, 'P3_H3', 'P3_H4')
  if (optional) choose(runner, 'P3_CERTIFICATE')
  choose(runner, 'P3_MINH_START', 'P3_MINH_R4', 'P3_R4_HAO', 'P3_R4_HOA', 'P3_R4_LINH')
  choose(runner, 'P3_POLICE_CHECK', 'P3_MINH_START')
  present(runner, 'ST_P3_MINH_NO_HANDLING', 'EV_PackagingMatch')
  expect(runner.state.flags.deduction_unlocked).toBe(false)
  press(runner, 'ST_P3_MINH_PARTIAL')
  choose(runner, 'P3_RECOVER', 'P3_MINH_START')
  present(runner, 'ST_P3_MINH_OLD_LOCATION', 'EV_OriginalInhaler')
  choose(runner, 'P3_HUB', 'P3_SEND', 'P3_SEND_CONFIRM')
  expect(runner.state.flags.victim_link_confirmed).toBe(true)
  expect(runner.state.flags.scene_revisit_available).toBe(false)
  choose(runner, 'P3_MINH_START')
  present(runner, 'ST_P3_MINH_NORMAL_REPLACEMENT', 'EV_MedicineAnalysis')
  press(runner, 'ST_P3_MINH_ACT')
  expect(runner.state.statements).not.toHaveProperty('ST_P4_MINH_HOSTAGE')
  choose(runner, 'P3_READY', 'P3_END')
  expect(runner.node.id).toBe('FD_BOARD')
  return runner
}

function fillBoard(runner, who) {
  const answer = graph.deduction.answerKey
  for (const { id } of runner.deductionSlots()) {
    const value =
      id === 'who'
        ? who
        : id.startsWith('evidence/')
          ? answer.evidence[id.split('/')[1]]
          : answer[id]
    expect(runner.editDeduction(id, value)).toBe(true)
  }
}

describe('Chương 1 — Data Contract 2.0', () => {
  it.each([false, true])('đi từ phòng 201 tới CH2_ENTRY (nguồn tùy chọn sớm: %s)', (optional) => {
    const runner = play(optional)
    if (!optional) {
      choose(runner, 'FD_SUBMIT')
      expect(runner.state.credibility).toBe(85)
      fillBoard(runner, 'DC_WHO_HOA')
      choose(runner, 'FD_SUBMIT')
      expect(runner.state.credibility).toBe(65)
      expect(runner.state.deduction.draft.who).toBe('DC_WHO_HOA')
    }
    fillBoard(runner, graph.deduction.answerKey.who)
    choose(runner, 'FD_SUBMIT')
    expect(runner.state.flags.final_notebook_updated).toBe(true)
    expect(runner.state.case_conclusions.CH1.when_precision).toBe('relation')
    choose(runner, 'FD_PHASE_TRANSITION', 'P4_MINH_HOSTAGE', 'P4_MINH_DEBT', 'P4_HUB')
    if (!optional) {
      choose(runner, 'P4_CLOSE_GATE')
      expect(runner.node.id).toBe('P4_INCOMPLETE')
      expect(runner.advance()).toBe(true)
      choose(runner, 'P4_COIN_OPEN', 'P4_HAO_COIN', 'P4_SURVEY_RECORD')
    } else {
      choose(runner, 'P4_COIN_OPEN', 'P4_HAO_COIN')
    }
    choose(runner, 'P4_LINH_SURVEY', 'P4_CERTIFICATE', 'P4_CLOSE_GATE')
    expect(runner.complete).toBe(true)
    expect(runner.state.current_node).toBe('CH2_ENTRY')
    expect(runner.state.flags.chapter1_complete).toBe(true)
    expect(runner.state.evidence_records.EV_BoundaryCoin.collected_phase).toBe(optional ? 2 : 4)
    const saved = JSON.parse(JSON.stringify(runner.state))
    expect(notebookSourceKey(saved.evidence_records.EV_BoundaryCoin)).toBe(
      optional ? 'notebook.source.room204Photo' : 'notebook.source.policeArchivePhoto',
    )
    expect(notebookSourceKey(saved.observations.OBS_P2_SURVEY)).toBe(
      optional ? 'notebook.source.room204Observation' : 'notebook.source.policeArchivePhoto',
    )
    expect(notebookSourceKey(saved.evidence_records.EV_KhangCertificate)).toBe(
      'notebook.source.hallwayCertificate',
    )
    expect(notebookSourceKey(saved.evidence_records.EV_MedicineAnalysis)).toBe(
      'notebook.source.policeRecord',
    )
    expect(saved.evidence_collected).not.toContain('OBS_P2_SURVEY')
    expect(runner.state.statements.ST_P4_MINH_HOSTAGE.status).toBe('claimed')
  })

  it('khôi phục checkpoint thật sau khi mất hết uy tín', () => {
    const before = play(false).state
    const runner = createStoryRunner(graph, { ...before, credibility: 20 })
    fillBoard(runner, 'DC_WHO_HOA')
    choose(runner, 'FD_SUBMIT')
    expect(runner.node.id).toBe('FD_BAD_MENU')
    choose(runner, 'CHECKPOINT_PRE_FINAL')
    expect(runner.node.id).toBe('FD_BOARD')
    expect(runner.state.credibility).toBe(before.credibility)
    expect(runner.state.deduction.draft.who).toBeNull()
  })

  it('tiếp tục đúng câu đang đọc và bỏ qua thao tác từ màn hình cũ', () => {
    const runner = createStoryRunner(graph, { ...initialState, current_node: 'P1_001__001' })
    expect(runner.node.id).toBe('P1_001__002')
    const version = runner.version
    expect(runner.advance(version)).toBe(true)
    expect(runner.advance(version)).toBe(false)
    const resumed = createStoryRunner(graph, JSON.parse(JSON.stringify(runner.state)))
    expect(resumed.state).toEqual(runner.state)
    expect(readThrough(resumed)).toBe('P1_HALL_204')
    choose(resumed, 'P1_ENTER_204', 'P1_SEE_TUNG', 'P1_LEAVE_204')
    expect(readThrough(resumed)).toBe('P1_HOA_MENU')
    expect(resumed.state.statements).toHaveProperty('ST_P1_HOA_INITIAL')
    expect(Object.keys(resumed.state.statements)).toHaveLength(1)
    expect(resumed.state.conversation_history).toBeUndefined()
    expect(resumed.state.conversation_draft.length).toBeGreaterThan(0)
    choose(resumed, 'P1_HOA_04')
    expect(resumed.state.conversation_history).toHaveLength(1)
    expect(resumed.state.conversation_draft).toEqual([])
    expect(resumed.state.conversation_history[0].some(({ speaker }) => speaker === 'HÒA')).toBe(
      true,
    )
    expect(resumed.state.statements).not.toHaveProperty('ST_P1_LINH_INITIAL')
  })
})
