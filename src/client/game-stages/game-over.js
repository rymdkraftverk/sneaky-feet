// eslint-disable-next-line no-unused-vars
import { Game, Entity, Timer, Key, Debug, Gamepad, Physics, Sound, Net, Text } from 'l1'

import { createPlayer } from '../player'
import { player_templates } from '../spawn_players';

import battle from './battle'

const createBackground = () => {
  const entity = Entity.create('background')
  const sprite = Entity.addSprite(entity, 'background', { zIndex: -200 })
  sprite.x = 0
  sprite.y = 0
  sprite.scale.set(2.5)
}

const renderWinner = id => {
  const animation = player_templates
    .filter(template => template.id == id)
    .map(template => template.animation)[0]

  createPlayer(id, {x: 750, y: 1000}, animation, 100)
}

export const gameOver = playerIds => playerId => () => {
  console.log(playerId + ' has won')

  Entity
    .getAll()
    .forEach(Entity.destroy)

  Game.getPhysicsEngine().world.gravity.y = 0

  createBackground()
  renderWinner(playerId)

  setTimeout(() => battle(playerIds), 5000)
}