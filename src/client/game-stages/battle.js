// eslint-disable-next-line no-unused-vars
import { Game, Entity, Timer, Key, Debug, Gamepad, Physics, Sound, Net, Text } from 'l1'
import sprites from '../sprites.json'
import scanGamepads from '../behaviors/scanGamepads'
import keys from '../keys'
import collisions from '../collisions'
// import { lobbyState } from './states'

import map from '../map'
import { spawnPlayers } from '../spawn_players'
import player_targets from '../player_targets'
import { createPortalPair } from '../portal'
import { gameOver } from './game-over'

// import createControllerPresets from './controllerPresets';

const createBackground = () => {
  const entity = Entity.create('background')
  const sprite = Entity.addSprite(entity, 'background', { zIndex: -200 })
  sprite.x = 0
  sprite.y = 0
  sprite.scale.set(2.5)
}

const createGears = () => {
  const gear1 = Entity.create('gear1')
  const gear1Sprite = Entity.addSprite(gear1, 'cog-one', { zIndex: -120 })
  gear1Sprite.x = 450
  gear1Sprite.y = 650
  gear1Sprite.scale.set(8)

  const gear2 = Entity.create('gear2')
  const gear2Sprite = Entity.addSprite(gear2, 'cog-one', { zIndex: -120 })
  gear2Sprite.x = 940
  gear2Sprite.y = 600
  gear2Sprite.scale.set(10)

}

const createPowerPlant = () => {
  const powerPlant = Entity.create('power-plant-one')
  const powerPlantSprite = Entity.addAnimation(powerPlant, ['power-plant-1', 'power-plant-2', 'power-plant-3', 'power-plant-4', 'power-plant-5'], 0.05, { zIndex: -200 })
  powerPlantSprite.x = 528
  powerPlantSprite.y = 350
  powerPlantSprite.scale.set(9)
}

const createHouses = () => {
  const houseOne = Entity.create('house-one')
  const houseOneSprite = Entity.addSprite(houseOne, 'house-one', { zIndex: -100 })
  houseOneSprite.x = 100
  houseOneSprite.y = 300
  houseOneSprite.scale.set(6)

  const houseTwo = Entity.create('house-two')
  const houseTwoSprite = Entity.addSprite(houseTwo, 'house-two', { zIndex: -100 })
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

export default playerIds => {
  Entity
    .getAll()
    .forEach(Entity.destroy)


  createBackground()
  createGears()
  createHouses()
  createPowerPlant()
  keys()
  map()

  createPortalPair('portal-a', 'portal-b', { ax: 100, ay: 100, bx: 800, by: 300 })
  createTransmissionBall()
  // createControllerPresets();

  const input = Entity.create('input')
  input.behaviors.scan = scanGamepads()

  createTransmissionWave()

  spawnPlayers(playerIds, gameOver)
  console.log('TARGETS')
  console.log(player_targets())
}