import { initPlayer, player1Animation, player2Animation, player3Animation, player4Animation } from './player'
import keyboard from './move/keyboard'
import gamepad from './move/gamepad'

const onDeath = playerId => () => console.log(playerId + ' has died')

const players = [
  {
    id: 'player1',
    x: 400,
    y: 100,
    target: 'player2',
    animation: player1Animation,
  },
  {
    id: 'player2',
    x: 600,
    y: 100,
    target: 'player3',
    animation: player2Animation,
  },
  {
    id: 'player3',
    x: 800,
    y: 100,
    target: 'player4',
    animation: player3Animation,
  },
  {
    id: 'player4',
    x: 1500,
    y: 100,
    target: 'player1',
    animation: player4Animation,
  },
]

export default n => {
  console.log(players)
  console.log(n)
  players.slice(0, n).forEach(p => {
    console.log(p)
    const player = initPlayer(
      p.id,
      p.target,
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
