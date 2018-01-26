import 'babel-polyfill'
// eslint-disable-next-line no-unused-vars
import { Game, Entity, Timer, Key, Debug, Gamepad, Physics, Sound, Net, Text } from 'l1'
import sprites from './sprites.json'
import scanGamepads from './behaviors/scanGamepads'
import keys from './keys'
// import { lobbyState } from './states'

import { initPlayer } from './player'

// import createControllerPresets from './controllerPresets';

const onDeath = playerId => () => console.log(playerId + ' has died')
const createBackground = () => {
  const entity = Entity.create('background')
  const sprite = Entity.addSprite(entity, 'background')
  sprite.x = 0
  sprite.y = 0
  sprite.scale.set(2.5)
}

const createPortal = () => {
  const entity = Entity.create('portal')
  const sprite = Entity.addSprite(entity, 'portal')
  sprite.x = 100
  sprite.y = 100
  sprite.scale.set(3.5)
}

Game.init(1730, 940, sprites, { debug: true, physics: true }).then(() => {
  Game.start()
  Game.getPhysicsEngine().world.gravity.y = 1
  Debug.toggleHitboxes()
  createBackground()
  keys()
  createPortal()
  // createControllerPresets();

  const input = Entity.create('input')
  input.behaviors.scan = scanGamepads()

  const playerId = 'uniqueIdentity'
  // this player is targeting itself meaning it will
  // burn itself to death shortly and start spamming the console
  initPlayer(playerId, playerId, { x: 100, y: 10 }, onDeath(playerId))
  // lobbyState()
  initPlayer(playerId, playerId, { x: 100, y: 10 }, onDeath(playerId))

  const floor = Entity.create('floor')
  Entity.addBody(floor, Physics.Bodies.rectangle(300, 390, 600, 10, { isStatic: true }))
})
