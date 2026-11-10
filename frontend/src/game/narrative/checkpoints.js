import { cloneJson } from './statePath'

export function restoreCheckpoint(state, checkpointId) {
  if (!Object.hasOwn(state.checkpoints, checkpointId)) {
    throw new Error(`Checkpoint chưa được lưu: ${checkpointId}`)
  }
  return { ...cloneJson(state.checkpoints[checkpointId]), checkpoints: state.checkpoints }
}
