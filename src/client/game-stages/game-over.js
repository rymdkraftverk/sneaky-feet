// eslint-disable-next-line no-unused-vars
import { Game, Entity, Timer, Key, Debug, Gamepad, Physics, Sound, Net, Text } from 'l1'

import { createPlayer } from '../player'
import { player_templates } from '../players'

import battle from './battle'
import deadLizard from '../deadLizard'
import { immolationType } from '../immolation-aura'

let isGameOvering = false

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
export const gameOver = players => hunterId => () => {
  if (isGameOvering) return
  console.log(hunterId + ' has won')
  players[hunterId]++

  console.log('SCORE:')
  console.log(players)

  isGameOvering = true
  const { target_id } = Entity.get(hunterId)
  const losingPlayer = Entity.get(target_id)

  const {x, y} = losingPlayer.sprite.position
  Entity.getByType('playerType').forEach((e) => { delete e.behaviors.gamepad })
  Entity.getByType(immolationType).forEach(Entity.destroy)
  
  const { walkingAnimation } = player_templates.find(({ id }) => id === target_id)
  const layingDownSprite = walkingAnimation[0]
  
  Entity.destroy(losingPlayer)
  Entity.destroy(Entity.get(`${target_id}Burn`))
  Entity.getByType('baloon').forEach(Entity.destroy)

  Sound.getSound('sound/fail.wav', { volume: 2}).play()

  deadLizard(x, y, layingDownSprite, () => {
    const entitiesToKeep = ['input', 'game-over']
    Entity
      .getAll()
      .filter(({ id }) => !entitiesToKeep.includes(id))
      .forEach(Entity.destroy)
  
    Game.getPhysicsEngine().world.gravity.y = 0
  
    createBackground()
    renderWinner(hunterId)
    isGameOvering = false
    setTimeout(() => battle(players), 5000)
  })
}
