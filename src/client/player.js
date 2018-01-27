import { Entity, Physics } from 'l1'

import { initImmolationAura, formatImmolationTargetType } from './immolation-aura'
import { initHealth } from './health'

const spriteName = 'square'
const playerType = 'playerType'

const createPlayer = (id, {x, y}) => {
  const player = Entity.create(id)
  const sprite = Entity.addSprite(player, spriteName)
  Entity.addBody(player, Physics.Bodies.rectangle(x, y, 80, 80, {
    inertia: Infinity,
  }))
  sprite.scale.set(5)
  sprite.anchor.y = 0.65

  Entity.addType(player, playerType)
  Entity.addType(player, formatImmolationTargetType(id))

  return player
}

const initPlayer = (id, targetId, {x, y}, onDeath) => {
  const player = createPlayer(id, {x, y})
  initImmolationAura(id, targetId, {x, y})

  player.health = initHealth(onDeath)
  return player
}

export { initPlayer }
