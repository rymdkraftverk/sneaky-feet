import _ from 'lodash'

import { initPlayer, player1Animation, player2Animation, player3Animation, player4Animation } from './player'
import keyboard from './move/keyboard'
import gamepad from './move/gamepad'

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
    id: 'player1',
    x: 400,
    y: 100,
    animation: player1Animation,
  },
  {
    id: 'player2',
    x: 600,
    y: 100,
    animation: player2Animation,
  },
  {
    id: 'player3',
    x: 800,
    y: 100,
    animation: player3Animation,
  },
  {
    id: 'player4',
    x: 1500,
    y: 100,
    animation: player4Animation,
  },
]

export default n => {
  const players = player_templates.slice(0, n)
  const targets = player_targets(players.map(x => x.id))

  players.forEach(p => {
    const player = initPlayer(
      p.id,
      targets[p.id],
      {x: p.x, y: p.y},
      onDeath(p.id),
      p.animation
    )
    if(p.id === 'player1') {
      player.behaviors.keyboard = keyboard()
      player.behaviors.gamepad = gamepad()
    }
  })
}
