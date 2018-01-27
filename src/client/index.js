import 'babel-polyfill'
import _ from 'lodash'
// eslint-disable-next-line no-unused-vars
import { Game, Entity, Timer, Key, Debug, Gamepad, Physics, Sound, Net, Text } from 'l1'
import sprites from './sprites.json'
import battle from './game-stages/battle'

import { playerIds } from './spawn_players'

// import createControllerPresets from './controllerPresets';

Game.init(1730, 940, sprites, { debug: true, physics: true }).then(() => {
  Sound
    .getSound('./sound/sneaky_feet.wav', { volue: 0.8, loop: true })
    .play()

  Game.start()
  Game.getPhysicsEngine().world.gravity.y = 1
  Debug.toggleHitboxes()

  battle(_.values(playerIds))
})

