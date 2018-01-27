// eslint-disable-next-line no-unused-vars
import { Game, Entity, Timer, Key, Debug, Gamepad, Physics, Sound, Net, Text } from 'l1'

import map from '../map'
import border_patrol from '../border_patrol'
import { spawnPlayers } from '../spawn_players'
import player_targets from '../player_targets'
import { gameOver } from './game-over'
import collisions from '../collisions'
import portals from '../portals'

// import createControllerPresets from './controllerPresets';

let battleMusic

export default playerIds => {
  Entity
    .getAll()
    .filter(({ id }) => id !== 'input')
    .forEach(Entity.destroy)

  Entity
    .removeAllCollisions()

  collisions()

  Game.getPhysicsEngine().world.gravity.y = 1

  map()
  portals()

  if (!battleMusic) {
    battleMusic = Sound
      .getSound('./sound/sneaky_feet.wav', { volume: 0.8, loop: true })
      .play()
  }

  spawnPlayers(playerIds, gameOver(playerIds))
  player_targets(5)
  border_patrol()
}
