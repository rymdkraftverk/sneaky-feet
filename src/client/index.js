import 'babel-polyfill'
import _ from 'lodash'
// eslint-disable-next-line no-unused-vars
import { Game, Entity, Timer, Key, Debug, Gamepad, Physics, Sound, Net, Text } from 'l1'
import sprites from './sprites.json'

import scanGamepads from './behaviors/scanGamepads'

import lobby from './game-stages/lobby'

// import createControllerPresets from './controllerPresets';

Game.init(1735, 965, sprites, { debug: true, physics: true }).then(() => {

  Game.start()
  // Debug.toggleHitboxes()
  Game.getPhysicsEngine().world.gravity.y = 1

  const input = Entity.create('input')
  input.behaviors.scan = scanGamepads()

  lobby()
})

