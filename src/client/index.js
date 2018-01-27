import 'babel-polyfill'
// eslint-disable-next-line no-unused-vars
import { Game, Entity, Timer, Key, Debug, Gamepad, Physics, Sound, Net, Text } from 'l1'
import sprites from './sprites.json'
import scanGamepads from './behaviors/scanGamepads'
import keys from './keys'
// import { lobbyState } from './states'

import { initPlayer } from './player'
import keyboard from './move/keyboard'
import gamepad from './move/gamepad'
import map from './map'

// import createControllerPresets from './controllerPresets';

const onDeath = playerId => () => console.log(playerId + ' has died')
const createBackground = () => {
  const entity = Entity.create('background')
  const sprite = Entity.addSprite(entity, 'background', { zIndex: -200 })
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

const createTransmissionBall = () => {
  const entity = Entity.create('transmission-ball')
  const sprite = Entity.addSprite(entity, 'transmission-ball')
  sprite.x = 150
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
  createTransmissionBall()
  // createControllerPresets();

  const input = Entity.create('input')
  input.behaviors.scan = scanGamepads()

  const playerId1 = 'player1'
  const playerId2 = 'player2'
  const playerId3 = 'player3'
  // this player is targeting itself meaning it will
  // burn itself to death shortly and start spamming the console
  const player1 = initPlayer(playerId1, playerId2, {x: 550, y: 100}, onDeath(playerId1))
  player1.behaviors.keyboard = keyboard()
  player1.behaviors.gamepad = gamepad()
  initPlayer(playerId2, playerId3, {x: 410, y: 100}, onDeath(playerId2))
  initPlayer(playerId3, playerId1, {x: 830, y: 100}, onDeath(playerId3))

  map()
})
