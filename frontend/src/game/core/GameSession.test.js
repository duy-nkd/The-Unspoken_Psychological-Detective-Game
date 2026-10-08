import { describe, expect, it } from 'vitest'
import { GameSession } from './GameSession'

describe('GameSession', () => {
  it('khởi tạo: chương 1, uy tín 100 (§3.3, §6.1)', () => {
    const session = new GameSession()
    expect(session.chapter).toBe(1)
    expect(session.credibility).toBe(100)
  })

  it('penalize báo depleted khi về 0', () => {
    const session = new GameSession({ credibility: 20 })
    expect(session.penalize(15)).toEqual({ value: 5, depleted: false })
    expect(session.penalize(30)).toEqual({ value: 0, depleted: true })
  })

  it('snapshot khớp tên trường payload /api/game/save (§4.3)', () => {
    const snapshot = new GameSession().toSaveSnapshot()
    expect(Object.keys(snapshot)).toEqual(['currentChapter', 'credibilityScore', 'saveDataJson'])
    expect(typeof snapshot.saveDataJson).toBe('string')
  })

  it('snapshot -> session -> snapshot không mất dữ liệu', () => {
    const original = new GameSession({ chapter: 1, credibility: 70 })
    original.addNotebookEntry('evidence', { id: 'EV-TEST', title: 'Mẫu kiểm thử' })
    const restored = GameSession.fromSaveSnapshot(original.toSaveSnapshot())
    expect(restored.toSaveSnapshot()).toEqual(original.toSaveSnapshot())
  })
})
