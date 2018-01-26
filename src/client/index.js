import 'babel-polyfill'
// eslint-disable-next-line no-unused-vars
import { Game, Entity, Timer, Key, Debug, Gamepad, Physics, Sound, Net, Text } from 'l1'
import sprites from './sprites.json'
import scanGamepads from './behaviors/scanGamepads'
import { menuState } from './states'

import { initPlayer } from './player'

// import createControllerPresets from './controllerPresets';

const onDeath = playerId => () => console.log(playerId + ' has died')

Game.init(1730, 940, sprites, { debug: true, physics: true }).then(() => {
  Game.start()
  Game.getPhysicsEngine().world.gravity.y = 1

  Debug.toggleHitboxes()
  // createControllerPresets();

  const input = Entity.create('input')
  input.behaviors.scan = scanGamepads()

  const playerId = 'uniqueIdentity'
  // this player is targeting itself meaning it will
  // burn itself to death shortly and start spamming the console
  initPlayer(playerId, playerId, {x: 100, y: 10}, onDeath(playerId))
  menuState()

  const floor = Entity.create('floor')
  Entity.addBody(floor, Physics.Bodies.rectangle(300, 390, 600, 10, { isStatic: true }))
})
