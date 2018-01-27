import _ from 'lodash'

import { initPlayer, player1Animation, player2Animation, player3Animation, player4Animation } from './player'
import keyboard from './controls/keyboard'
import gamepad from './controls/gamepad'
import attack from './controls/attack'

export const playerIds = {
  player1: 'player1',
  player2: 'player2',
  player3: 'player3',
  player4: 'player4',
}

const onDeath = playerId => () => console.log(playerId + ' has died')

const player_targets = player_ids => {
  const shuffled = _.shuffle(player_ids)
  return shuffled.map((id, i) => {
    const target_index = i === (player_ids.length - 1) ? 0 : i + 1
    const t = shuffled[target_index]
    return {[id]: t}
  })
}

const player_templates = [
  {
    id: playerIds.player1,
    x: 400,
    y: 100,
    animation: player1Animation,
  },
  {
    id: playerIds.player2,
    x: 600,
    y: 100,
    animation: player2Animation,
  },
  {
    id: playerIds.player3,
    x: 800,
    y: 100,
    animation: player3Animation,
  },
  {
    id: playerIds.player4,
    x: 1500,
    y: 100,
    animation: player4Animation,
  },
]

export default n => {
  const players = player_templates.slice(0, n)
  const targets = player_targets(players.map(x => x.id))

  players.forEach((p, index) => {
    const player = initPlayer(
      p.id,
      targets[p.id],
      {x: p.x, y: p.y},
      onDeath(p.id),
      p.animation
    )
    player.behaviors.gamepad = gamepad(index)
    player.behaviors.attack = attack(index)
    if(p.id === 'player1') {
      player.behaviors.keyboard = keyboard()
    }
  })
}
