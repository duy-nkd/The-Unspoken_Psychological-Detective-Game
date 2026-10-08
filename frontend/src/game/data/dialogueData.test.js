import { describe, expect, it } from 'vitest'
import { dialogueUrl, parseDialogueFile } from './dialogueData'

describe('dialogueData — Project.docx §3.2', () => {
  it('đường dẫn nằm trong assets/dialogues/', () => {
    expect(dialogueUrl(1)).toBe('assets/dialogues/chapter-1.json')
  })

  it('đọc được file chapter-1.json hiện có (dialogues rỗng)', () => {
    const parsed = parseDialogueFile({ chapter: 1, title: 'Opening', dialogues: [] })
    expect(parsed).toEqual({ chapter: 1, title: 'Opening', lines: [] })
  })

  it('từ chối dữ liệu không phải object', () => {
    expect(() => parseDialogueFile(null)).toThrow(TypeError)
  })
})
