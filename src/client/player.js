import { Entity, Game, Util, Physics } from 'l1'

import { initImmolationAura, formatImmolationTargetType } from './immolation-aura'
import { formatKnockBackTargetType } from './knockback'
import { initHealth } from './health'
import { categories } from './collisions'
import keyboard from './controls/keyboard'
import gamepad from './controls/gamepad'
import attack from './controls/attack'
import lifebar from './behaviors/lifebar'
import hjaelp from './hjaelp'
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

const burnFrames = ['fire1', 'fire2', 'fire3']

const renderBurn = (id) => ({
  init: b => {
    const burn = Entity.create(`${id}Burn`)
    b.sprite = Entity.addAnimation(burn, burnFrames, 0.05, { zIndex: 100} )
    b.sprite.scale.set(4)
  },
  run: (b, e) => {
    b.sprite.x = e.sprite.x - e.sprite.width / 2
    b.sprite.y = e.sprite.y - e.sprite.height / 2
    if (e.burn) {
      b.sprite.visible = true
    } else {
      b.sprite.visible = false
    }
  },
})

const useFrames = (e, frames) => {
  e.sprite.textures = frames.map(Game.getTexture)
  e.sprite.play()
}

const makeSetWalking = (originalFrames, walkingFrames) => (e, direction) => {
  if (direction === 'left') {
    useFrames(e, walkingFrames)
    if (!e.sprite.flipped) {
      Util.flipSprite(e.sprite)
    }
  } else if (direction === 'right') {
    useFrames(e, walkingFrames)
    if (e.sprite.flipped) {
      Util.flipSprite(e.sprite)
    }
  } else {
    useFrames(e, originalFrames)
  }
  e.sprite.anchor.x = 0.5
}

const activatePlayer = p => {
  p.behaviors.hjaelp = hjaelp(p.id)
  p.behaviors.snige_fodder = snige_fodder(p.id)

  p.behaviors.gamepad = gamepad(p.index)
  p.behaviors.attack = attack(p.index)
  p.behaviors.renderBurn = renderBurn(p.id)
  
  p.behaviors.lifebar = lifebar(p.sprite, p.sprite.width, 5)

  if(p.id === 'player1') {
    p.behaviors.keyboard = keyboard()
  }
}

const createPlayer = (id, {x, y}, animation, scale, walkingAnimation) => {
  const player = Entity.create(id)
  const sprite = Entity.addAnimation(player, animation, 0.05, { zIndex: 10 })
  Entity.addBody(player, Physics.Bodies.rectangle(x, y, 50, 50, {
    inertia: Infinity,
    restitution: 0,
    collisionFilter: {
      category: categories.characters,
      mask: categories.default,
    },
    friction: 0,
  }))
  sprite.scale.set(scale || 5)
  sprite.anchor.y = 0.65

  Entity.addType(player, playerType)
  Entity.addType(player, formatImmolationTargetType(id))
  Entity.addType(player, formatKnockBackTargetType(id))

  player.setWalking = makeSetWalking(animation, walkingAnimation)

  return player
}

const initPlayer = (id, targetId, {x, y}, onDeath, animation, walkingAnimation) => {
  const player = createPlayer(id, {x, y}, animation, undefined, walkingAnimation)
  player.target_id = targetId
  initImmolationAura(id, targetId, {x, y})

  player.health = initHealth(onDeath)
  return player
}

export { initPlayer, createPlayer, activatePlayer }
