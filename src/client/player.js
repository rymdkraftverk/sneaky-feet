import { Entity, Physics } from 'l1'

import { initImmolationAura, formatImmolationTargetType } from './immolation-aura'
import { formatKnockBackTargetType } from './knockback'
import { initHealth } from './health'
import { categories } from './collisions'
import snige_fodder from './snige_fodder'

export const player1Animation = ['lizard1', 'lizard2']
export const player2Animation = ['lizard1-p2', 'lizard2-p2']
export const player3Animation = ['lizard1-p3', 'lizard2-p3']
export const player4Animation = ['lizard1-p4', 'lizard2-p4']

export const player1Walking = ['lizard3', 'lizard4']
export const player2Walking = ['lizard3-p2', 'lizard4-p2']
export const player3Walking = ['lizard3-p3', 'lizard4-p3']
export const player4Walking = ['lizard3-p4', 'lizard4-p4']

const playerType = 'playerType'

const createPlayer = (id, {x, y}, animation, scale) => {
  const player = Entity.create(id)
  const sprite = Entity.addAnimation(player, animation, 0.05, { zIndex: 10 })
  Entity.addBody(player, Physics.Bodies.rectangle(x, y, 50, 50, {
    inertia: Infinity,
    restitution: 0,
    collisionFilter: {
      category: categories.characters,
      mask: categories.default,
    },
  }))
  sprite.scale.set(scale || 5)
  sprite.anchor.y = 0.65

  Entity.addType(player, playerType)
  Entity.addType(player, formatImmolationTargetType(id))
  Entity.addType(player, formatKnockBackTargetType(id))

  return player
}

const initPlayer = (id, targetId, {x, y}, onDeath, animation) => {
  const player = createPlayer(id, {x, y}, animation)
  player.target_id = targetId
  initImmolationAura(id, targetId, {x, y})

  player.health = initHealth(onDeath)
  player.behaviors.snige_fodder = snige_fodder(id)
  return player
}

export { initPlayer, createPlayer }
