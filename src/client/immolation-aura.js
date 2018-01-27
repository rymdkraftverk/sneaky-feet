
import { Entity, Physics } from 'l1'

import follow from './behaviors/follow'
import { updateHealth } from './health'

const immolationType = 'immolationType'
const immolationIdPrefix = 'immolation '
const radius = 80

const burnDps = -30
const ticksPerSec = 60
const dmgPerTick = burnDps / ticksPerSec


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
  } else {
    obj2.entity.health = updateHealth(obj2.entity.health, dmgPerTick)
    obj2.entity.burn = true
  }
}

const stopBurn = (obj1, obj2) => {
  if(obj1.entity.health)
  {
    obj1.entity.burn = false
  } else {
    obj2.entity.burn = false
  }
}

export { initImmolationAura, formatImmolationTargetType }