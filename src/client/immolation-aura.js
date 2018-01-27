
import { Entity, Physics } from 'l1'

import follow from './behaviors/follow'
import { updateHealth } from './health'
import stalk from './behaviors/stalk'

const immolationType = 'immolationType'
const immolationIdPrefix = 'immolation '
const radius = 80

const burnDps = -30
const ticksPerSec = 60
const dmgPerTick = burnDps / ticksPerSec

const flameThrowerAnimation = [
  'fireball1',
  'fireball2',
]

const createImmolationAura = (ownerId, {x, y}) => {
  const immolation = Entity.create(immolationIdPrefix + ownerId)
  Entity.addBody(immolation, Physics.Bodies.circle(x, y, radius, {isStatic: true, isSensor: true}))

  Entity.addType(immolation, immolationType)
  Entity.addType(immolation, formatImmolationType(ownerId))

  return immolation
}

const initImmolationAura = (ownerId, targetId, {x, y}) => {
  const immolation = createImmolationAura(ownerId, {x, y})

  immolation.behaviors.follow = follow(ownerId)

  Entity.addCollision(
    formatImmolationType(ownerId),
    formatImmolationTargetType(targetId),
    burn
  )

  Entity.addCollision(
    formatImmolationType(ownerId),
    formatImmolationTargetType(targetId),
    stopBurn,
    'collisionEnd'
  )

  return immolation
}

const formatImmolationTargetType = targetId =>
  'immolationTarget: ' + targetId

const formatImmolationType = id =>
  'immolation: ' + id

const burn = (obj1, obj2) => {
  if(obj1.entity.health)
  {
    obj1.entity.health = updateHealth(obj1.entity.health, dmgPerTick)
    obj1.entity.burn = true
    breathFire(obj2.position, obj1.entity)
  } else {
    obj2.entity.health = updateHealth(obj2.entity.health, dmgPerTick)
    obj2.entity.burn = true
    breathFire(obj1.position, obj2.entity)
  }
}

const breathFire = (startingPoint, target) => {
  const projectile = Entity.create(Math.random())
  //const sprite = Entity.addSprite(projectile, 'transmission-ball')
  const sprite = Entity
    .addAnimation(projectile, flameThrowerAnimation, 2, { zIndex: 100 })

  Entity.addBody(projectile, Physics.Bodies.circle(startingPoint.x, startingPoint.y, 30, {isSensor: true}))
  sprite.scale.set(4)
  sprite.anchor.y = 0.65

  Entity.addType(projectile, formatFireballType(projectile))

  Entity.addCollision(
    formatFireballType(projectile),
    formatImmolationTargetType(target.id),
    () => Entity.destroy(projectile)
  )

  projectile.behaviors.stalk = stalk(target.id)

  return projectile
}

const formatFireballType = fireball =>
  'fireball ' + fireball.id

const stopBurn = (obj1, obj2) => {
  if(obj1.entity.health)
  {
    obj1.entity.burn = false
  } else {
    obj2.entity.burn = false
  }
}

export { initImmolationAura, formatImmolationTargetType }