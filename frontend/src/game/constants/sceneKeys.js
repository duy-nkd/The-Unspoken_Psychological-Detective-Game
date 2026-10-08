/**
 * Khóa scene — dùng hằng số thay vì chuỗi rời rạc để tránh gõ sai và dễ "Find usages".
 * 5 scene nghiệp vụ theo Project.docx §3.2; Boot/Preload/BadEnding/Debug là scene hạ tầng.
 */
export const SCENE_KEYS = Object.freeze({
  BOOT: 'BootScene',
  PRELOAD: 'PreloadScene',
  MAIN_MENU: 'MainMenuScene', // §3.2
  DIALOGUE: 'DialogueScene', // §3.2
  ROOM_INVESTIGATION: 'RoomInvestigationScene', // §3.2
  NOTEBOOK: 'NotebookScene', // §3.2
  DEDUCTION: 'DeductionScene', // §3.2
  BAD_ENDING: 'BadEndingScene', // §3.3: uy tín = 0 -> Bad Ending ngắn
  DEBUG: 'DebugScene', // chỉ chạy khi env.debug
})
