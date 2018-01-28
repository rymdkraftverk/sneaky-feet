// eslint-disable-next-line no-unused-vars
import { Game, Entity, Timer, Key, Debug, Gamepad, Physics, Sound, Net, Text } from 'l1'

import map from '../map'
import border_patrol from '../border_patrol'
import * as players from '../players'
import player_targets from '../player_targets'
import { gameOver } from './game-over'
import collisions from '../collisions'
import portals from '../portals'

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
  players.spawn(Object.keys(player_tracker), gameOver(player_tracker))
  player_targets(5)
  players.activate()

  // COUNTDOWN
  console.log('COUNT')

  if (!battleMusic) {
    battleMusic = Sound
      .getSound('./sound/sneaky_feet.wav', { volume: 0.8, loop: true })
      .play()
  }

  border_patrol()
  portals()
}
