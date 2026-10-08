import { describe, expect, it } from 'vitest'
import { AUTOSAVE } from '../constants/gameplay'
import { createAutosaveScheduler } from './autosave'

/** Đồng hồ giả: ghi lại interval để test gọi tay thay vì chờ 5 phút thật. */
function createFakeTimers() {
  const intervals = new Map()
  let nextId = 1
  return {
    intervals,
    setInterval(fn, ms) {
      intervals.set(nextId, { fn, ms })
      return nextId++
    },
    clearInterval(id) {
      intervals.delete(id)
    },
    tickAll() {
      intervals.forEach(({ fn }) => fn())
    },
  }
}

describe('autosave — Project.docx §5.2', () => {
  it('chu kỳ mặc định 5 phút', () => {
    expect(AUTOSAVE.INTERVAL_MS).toBe(300000)
    const timers = createFakeTimers()
    createAutosaveScheduler({ onSave: () => {}, timers }).start()
    expect([...timers.intervals.values()][0].ms).toBe(300000)
  })

  it('lưu theo chu kỳ với reason "interval"', () => {
    const timers = createFakeTimers()
    const reasons = []
    const autosave = createAutosaveScheduler({ onSave: (r) => reasons.push(r), timers })
    autosave.start()
    timers.tickAll()
    expect(reasons).toEqual(['interval'])
  })

  it('trigger lưu ngay khi có sự kiện quan trọng', () => {
    const reasons = []
    const autosave = createAutosaveScheduler({
      onSave: (r) => reasons.push(r),
      timers: createFakeTimers(),
    })
    autosave.trigger(AUTOSAVE.REASONS.EVIDENCE_COLLECTED)
    expect(reasons).toEqual(['evidence-collected'])
  })

  it('start 2 lần chỉ tạo 1 interval; stop dọn sạch', () => {
    const timers = createFakeTimers()
    const autosave = createAutosaveScheduler({ onSave: () => {}, timers })
    autosave.start()
    autosave.start()
    expect(timers.intervals.size).toBe(1)
    autosave.stop()
    expect(timers.intervals.size).toBe(0)
    expect(autosave.isRunning).toBe(false)
  })
})
