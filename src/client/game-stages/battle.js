// eslint-disable-next-line no-unused-vars
import { Game, Entity, Timer, Key, Debug, Gamepad, Physics, Sound, Net, Text } from 'l1'

import map from '../map'
import border_patrol from '../border_patrol'
import * as players from '../players'
import { gameOver } from './game-over'
import battle_prep from '../battle-prep'
import collisions from '../collisions'
import portals from '../portals'
import ultimate from '../ultimate'

// import createControllerPresets from './controllerPresets';

let battleMusic

export default player_tracker => {
  Entity
    .getAll()
    .filter(({ id }) => id !== 'input')
    .forEach(Entity.destroy)

  Entity
    .removeAllCollisions()

  collisions()

  Game.getPhysicsEngine().world.gravity.y = 1

  map()
  const players_ids = Object.keys(player_tracker)
  players.spawn(players_ids, gameOver(player_tracker))
  battle_prep(players_ids.length + 1, () => {
    console.log('GO!')
    players.activate()

    playBattleMusic()

    border_patrol()
    portals()
    ultimate({x: 850, y: 430})
  })
}

export const stopBattleMusic = () => {
  if (battleMusic) {
    battleMusic.pause()
  }
}

export const playBattleMusic = () => {
  if (!battleMusic) {
    battleMusic = Sound.getSound('./sound/sneaky_feet.wav', { volume: 0.8, loop: true })
    battleMusic.play()
  }
}