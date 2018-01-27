// eslint-disable-next-line no-unused-vars
import { Game, Entity, Timer, Key, Debug, Gamepad, Physics, Sound, Net, Text } from 'l1'
import keys from '../keys'
// import { lobbyState } from './states'

import map from '../map'
import border_patrol from '../border_patrol'
import { spawnPlayers } from '../spawn_players'
import player_targets from '../player_targets'
import { gameOver } from './game-over'
import collisions from '../collisions'
import portals from '../portals'

// import createControllerPresets from './controllerPresets';

const createTower = () => {
  const tower = Entity.create('tower-one')
  const sprite = Entity.addAnimation(
    tower,
    [
      'tower-1',
      'tower-2',
      'tower-3',
      'tower-4',
      'tower-5',
      'tower-6',
      'tower-7',
      'tower-8',
      'tower-9',
      'tower-10',
      'tower-11',
      'tower-12',
      'tower-13',
      'tower-14',
      'tower-15',
      'tower-16',
      'tower-17',
    ],
    0.05,
    { zIndex: -160 }
  )
  sprite.x = -500
  sprite.y = -100
  sprite.scale.set(4.5)
}

const createSceneOverlay = () => {
  const overlay = Entity.create('scene-overlay')
  const sprite = Entity.addSprite(overlay, 'scene-overlay', { zIndex: -100 })
  sprite.x = 0
  sprite.y = 0
  sprite.alpha = 0.55
  sprite.scale.set(2.5)
}

const createChurch = () => {
  const church = Entity.create('church-one')
  const churchSprite = Entity.addAnimation(church, ['church-1', 'church-2', 'church-3', 'church-4', 'church-5', 'church-6'], 0.05, { zIndex: -120 })
  churchSprite.x = 1270
  churchSprite.y = 454
  churchSprite.scale.set(9)
}

const createBackground = () => {
  const entity = Entity.create('background')
  const sprite = Entity.addSprite(entity, 'background', { zIndex: -500 })
  sprite.x = 0
  sprite.y = 0
  sprite.scale.set(2.5)
}

const createGears = () => {
  const gear1 = Entity.create('gear1')
  const gear1Sprite = Entity.addSprite(gear1, 'cog-one', { zIndex: -120 })
  gear1Sprite.x = 410
  gear1Sprite.y = 750
  gear1Sprite.scale.set(8)

  const gear2 = Entity.create('gear2')
  const gear2Sprite = Entity.addSprite(gear2, 'cog-one', { zIndex: -120 })
  gear2Sprite.x = 940
  gear2Sprite.y = 650
  gear2Sprite.scale.set(10)

}

const createPowerPlant = () => {
  const powerPlant = Entity.create('power-plant-one')
  const powerPlantSprite = Entity.addAnimation(powerPlant, ['power-plant-1', 'power-plant-2', 'power-plant-3', 'power-plant-4', 'power-plant-5'], 0.05, { zIndex: -130 })
  powerPlantSprite.x = 500
  powerPlantSprite.y = 374
  powerPlantSprite.scale.set(9)
}

const createHouses = () => {
  const houseOne = Entity.create('house-one')
  const houseOneSprite = Entity.addSprite(houseOne, 'house-one', { zIndex: -100 })
  houseOneSprite.x = 100
  houseOneSprite.y = 350
  houseOneSprite.scale.set(6)

  const houseTwo = Entity.create('house-two')
  const houseTwoSprite = Entity.addSprite(houseTwo, 'house-two', { zIndex: -100 })
  houseTwoSprite.x = 1120
  houseTwoSprite.y = 158
  houseTwoSprite.scale.set(6)
}

export default playerIds => {
  Entity
    .getAll()
    .forEach(Entity.destroy)

  Entity
    .removeAllCollisions()

  collisions()

  Game.getPhysicsEngine().world.gravity.y = 1

  createBackground()
  createGears()
  createHouses()
  createPowerPlant()
  createChurch()
  createTower()
  createSceneOverlay()
  keys()
  map()
  portals()

  Sound
    .getSound('./sound/sneaky_feet.wav', { volue: 0.8, loop: true })
    .play()

  spawnPlayers(playerIds, gameOver(playerIds))
  player_targets(5)
  border_patrol()
}
