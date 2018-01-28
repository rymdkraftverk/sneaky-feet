import { Entity } from 'l1'
import _ from 'lodash'

import {
  initPlayer,
  activatePlayer,
  player1Animation,
  player2Animation,
  player3Animation,
  player4Animation,
  player1Walking,
  player2Walking,
  player3Walking,
  player4Walking,
} from './player'

export const playerIds = {
  player1: 'player1',
  player2: 'player2',
  player3: 'player3',
  player4: 'player4',
}

const player_targets = player_ids => {
  const shuffled = _.shuffle(player_ids)
  return shuffled.map((id, i) => {
    const target_index = i === (player_ids.length - 1) ? 0 : i + 1
    const t = shuffled[target_index]
    return {[id]: t}
  }).reduce((a, b) => Object.assign(a, b))
}

export const player_templates = [
  {
    id: playerIds.player1,
    x: 400,
    y: 100,
    animation: player1Animation,
    walkingAnimation: player1Walking,
  },
  {
    id: playerIds.player2,
    x: 600,
    y: 100,
    animation: player2Animation,
    walkingAnimation: player2Walking,
  },
  {
    id: playerIds.player3,
    x: 800,
    y: 100,
    animation: player3Animation,
    walkingAnimation: player3Walking,
  },
  {
    id: playerIds.player4,
    x: 1500,
    y: 100,
    animation: player4Animation,
    walkingAnimation: player4Walking,
  },
]

export const spawn = (activePlayerIds, onDeath) => {
  const players = player_templates
    .filter(template => _.includes(activePlayerIds, template.id))

  const targets = player_targets(players.map(x => x.id))
  const hunters = _.invert(targets)

  console.log('TARGETS:')
  console.log(targets)

  players.forEach((p, index) => {
    const player = initPlayer(
      p.id,
      targets[p.id],
      {x: p.x, y: p.y},
      onDeath(hunters[p.id]),
      p.animation,
      p.walkingAnimation
    )
    player.index = index
  })
}

export const activate = () => {
  Entity.getByType('playerType').forEach(activatePlayer)
}
