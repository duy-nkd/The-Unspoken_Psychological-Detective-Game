import { HALLWAY } from './rooms/hallway'
import { ROOM_204_HOTSPOTS } from './rooms/room204'

const OPENING_MAP = {
  P1_HALL_204: 'story.objective.enter204',
  P1_ROOM_204_VIEW: 'story.objective.seeTung',
  P1_ROOM_204_EXIT: 'story.objective.leave204',
}

const OPENING_TARGETS = {
  P1_ENTER_204: HALLWAY.hotspots.find(({ id }) => id === 'HALL_A204'),
  P1_SEE_TUNG: ROOM_204_HOTSPOTS.HP_NECK,
  P1_LEAVE_204: ROOM_204_HOTSPOTS.P2_EXIT_CHECK,
}

const HALLWAY_TARGETS = {
  P1_LINH_DISPATCH: { name: 'Linh', suspect: 'linh', stand: [784, 458] },
  P1_HAO_DISPATCH: { name: 'Hào', suspect: 'hao', stand: [518, 464] },
  P1_MINH_DISPATCH: { name: 'Minh', suspect: 'minh', stand: [929, 458] },
  P1_REVISIT_HOA: { name: 'Hòa', stand: [632, 458] },
  P3_LINH_START: { name: 'Linh', suspect: 'linh', stand: [784, 458] },
  P3_HAO_START: { name: 'Hào', suspect: 'hao', stand: [518, 464] },
  P3_MINH_START: { name: 'Minh', suspect: 'minh', stand: [929, 458] },
  P3_HOA_START: { name: 'Hòa', stand: [632, 458] },
}

export function openingMapObjective(node) {
  return OPENING_MAP[node?.id]
}

export function isStoryMapNode(node) {
  return (
    Boolean(openingMapObjective(node)) || ['P1_HUB_MENU', 'P3_HUB', 'P2_ROOM_UI'].includes(node?.id)
  )
}

export function storyMapHotspots(runner) {
  if (!isStoryMapNode(runner.node)) return []
  return runner.choices().flatMap((choice) => {
    const target =
      OPENING_TARGETS[choice.targetNode] ??
      (runner.node.type === 'investigation'
        ? ROOM_204_HOTSPOTS[choice.id ?? choice.targetNode]
        : HALLWAY_TARGETS[choice.targetNode])
    if (!target) return []
    const [x, y] = target.stand
    return [
      {
        id: choice.id ?? choice.targetNode,
        label: choice.text,
        face: 'up',
        choiceIndex: choice.index,
        ...target,
        name:
          choice.targetNode === 'P1_HAO_DISPATCH' && !runner.state.flags.hao_name_known
            ? 'Người đàn ông'
            : target.name,
        rect: target.rect ?? [x - 30, y - 110, 60, 108],
      },
    ]
  })
}
