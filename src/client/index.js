import 'babel-polyfill'
// eslint-disable-next-line no-unused-vars
import { Game, Entity, Timer, Key, Debug, Gamepad, Physics, Sound, Net, Text } from 'l1'
import sprites from './sprites.json'
import scanGamepads from './behaviors/scanGamepads'
import keys from './keys'
import collisions from './collisions'
// import { lobbyState } from './states'

import map from './map'
import spawn_players from './spawn_players'
import { fireKnockBack } from './knockback'
import { createPortalPair } from './portal'
import attack from './controls/attack'

// import createControllerPresets from './controllerPresets';

const createBackground = () => {
  const entity = Entity.create('background')
  const sprite = Entity.addSprite(entity, 'background', { zIndex: -200 })
  sprite.x = 0
  sprite.y = 0
  sprite.scale.set(2.5)
}

const createHouses = () => {
  const houseOne = Entity.create('house-one')
  const houseOneSprite = Entity.addSprite(houseOne, 'house-one')
  houseOneSprite.x = 100
  houseOneSprite.y = 300
  houseOneSprite.scale.set(6)

  const houseTwo = Entity.create('house-two')
  const houseTwoSprite = Entity.addSprite(houseTwo, 'house-two')
  houseTwoSprite.x = 1200
  houseTwoSprite.y = 108
  houseTwoSprite.scale.set(6)
}

const createTransmissionBall = () => {
  const entity = Entity.create('transmission-ball')
  const sprite = Entity.addSprite(entity, 'transmission-ball')
  sprite.x = 150
  sprite.y = 100
  sprite.scale.set(3.5)
}

const createTransmissionWave = () => {
  const entity = Entity.create('transmission-wave-1')
  const sprite = Entity.addAnimation(entity, ['transmission-wave-1', 'transmission-wave-2', 'transmission-wave-3', 'transmission-wave-4', 'transmission-wave-5'], 0.1)
  sprite.x = 550
  sprite.y = 150
  sprite.scale.set(4.5)
}

Game.init(1730, 940, sprites, { debug: true, physics: true }).then(() => {
  Game.start()
  Game.getPhysicsEngine().world.gravity.y = 1
  Debug.toggleHitboxes()
  createBackground()
  createHouses()
  keys()
  map()

  createPortalPair('portal-a', 'portal-b', { ax: 100, ay: 100, bx: 800, by: 300 })
  createTransmissionBall()
  // createControllerPresets();

  const input = Entity.create('input')
  input.behaviors.scan = scanGamepads()

  createTransmissionWave()

  spawn_players(4)
  fireKnockBack('player3', { x: 1550, y: 300 })

  collisions()
})

