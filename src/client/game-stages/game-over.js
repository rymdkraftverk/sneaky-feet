// eslint-disable-next-line no-unused-vars
import _ from 'lodash'
import { Game, Entity, Timer, Key, Debug, Gamepad, Physics, Sound, Net, Text } from 'l1'

import { createPlayer } from '../player'
import { player_templates } from '../players'

import battle from './battle'
import lobby from './lobby'
import deadLizard from '../deadLizard'
import { immolationType } from '../immolation-aura'

let isGameOvering = false

const createBackground = () => {
  const entity = Entity.create('background')
  const sprite = Entity.addSprite(entity, 'background-lobby', { zIndex: -200 })
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

const renderLizards = score => {
  const playerIds = _.sortBy(Object.keys(score), x => x)
  const sortedTemplates = _.sortBy(player_templates, player_template => player_template.id)
  const positions = [
    {x: 100, y: 200},
    {x: 100, y: 800},
    {x: 1500, y: 200},
    {x: 1500, y: 800},
  ]

  _.zipWith(playerIds, sortedTemplates, positions, (id, template, pos) => {
    createPlayer(id + ' display', pos, template.animation, 6)
    renderScore(score[id], pos)
  })
}

const renderScore = (score, lizardPos) => {
  const position = Physics.Vector.add(lizardPos, {x: -50, y: 50})

  for(let i = 0; i < 3; i++) {
    const spriteName = i < score
      ? 'point-won'
      : 'point-empty'

    renderPoint(spriteName, {x: position.x + i * 75, y: position.y})
  }
}

const renderPoint = (spriteName, position) => {
  const entity = Entity.create(Math.random())
  const sprite = Entity.addSprite(entity, spriteName, { zIndex: 10} )
  sprite.position = position
  sprite.scale.set(4)
}

const renderWinnerText = () => {
  const entity = Entity.create(Math.random())
  const sprite = Entity.addSprite(entity, 'winner', { zIndex: 10} )
  sprite.position = {x: 300, y: 20}
  sprite.scale.set(4)
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
    renderLizards(players)

    const nextStage = players[hunterId] < 3
      ? battle
      : lobby

    if(players[hunterId] >= 3) {
      renderWinnerText()
    }

    isGameOvering = false
    setTimeout(() => nextStage(players), 5000)
  })
}
