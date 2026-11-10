/**
 * Tên sự kiện trên EventBus (cầu nối Phaser <-> React).
 * Quy ước: '<miền>:<hành động>'. Payload ghi trong comment để bên nghe biết dữ liệu nhận được.
 */
export const GAME_EVENTS = Object.freeze({
  /** Phaser -> React. payload: { reason: string, snapshot: SaveSnapshot } */
  SAVE_REQUESTED: 'save:requested',
  /** Phaser -> React. payload: none — người chơi bấm Load Game ở MainMenu */
  LOAD_REQUESTED: 'save:load-requested',
  /** React -> Phaser. Payload là snapshot lưu cục bộ. */
  LOAD_RESULT: 'save:load-result',
  /** Phaser -> React. payload: none — người chơi chọn tải checkpoint ở Bad Ending */
  CHECKPOINT_RELOAD_REQUESTED: 'save:checkpoint-reload-requested',
  /** Phaser nội bộ. payload: { value: number, depleted: boolean } */
  CREDIBILITY_CHANGED: 'credibility:changed',
  /** Phaser nội bộ. payload: { tab: string, entry: object } */
  NOTEBOOK_ENTRY_ADDED: 'notebook:entry-added',
  /** React -> Phaser. payload: { message: string } — hiện thông báo ngắn trong game */
  TOAST: 'ui:toast',
  /**
   * React -> Phaser. payload: { hasSave: boolean } — trình duyệt đang có bản lưu hay không
   * (useGameBridge gửi khi mở trang và sau mỗi lần lưu). MainMenu dùng để mờ "Tiếp tục điều tra"
   * và hỏi xác nhận trước khi bắt đầu ván mới (DEC-012).
   */
  SAVE_AVAILABILITY: 'save:availability',
  /**
   * React -> Phaser. payload: { ok: boolean, remote: boolean, message?: string } — kết quả một lần lưu
   * (useGameBridge gửi sau persistProgress). Sổ tay hiện kết quả cho người chơi (DEC-013 Q-R6).
   */
  SAVE_RESULT: 'save:result',
  /** Phaser nội bộ. payload: settings (systems/settings.js) — sau khi người chơi bấm Lưu ở Cài đặt */
  SETTINGS_CHANGED: 'settings:changed',
})
