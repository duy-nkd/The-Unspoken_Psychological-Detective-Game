/**
 * Tên sự kiện trên EventBus (cầu nối Phaser <-> React).
 * Quy ước: '<miền>:<hành động>'. Payload ghi trong comment để bên nghe biết dữ liệu nhận được.
 */
export const GAME_EVENTS = Object.freeze({
  /** Phaser -> React. payload: { reason: string, snapshot: SaveSnapshot } */
  SAVE_REQUESTED: 'save:requested',
  /** Phaser -> React. payload: none — người chơi bấm Load Game ở MainMenu */
  LOAD_REQUESTED: 'save:load-requested',
  /** Phaser -> React. payload: none — người chơi chọn tải checkpoint ở Bad Ending */
  CHECKPOINT_RELOAD_REQUESTED: 'save:checkpoint-reload-requested',
  /** Phaser nội bộ. payload: { value: number, depleted: boolean } */
  CREDIBILITY_CHANGED: 'credibility:changed',
  /** Phaser nội bộ. payload: { tab: string, entry: object } */
  NOTEBOOK_ENTRY_ADDED: 'notebook:entry-added',
  /** React -> Phaser. payload: { message: string } — hiện thông báo ngắn trong game */
  TOAST: 'ui:toast',
})
