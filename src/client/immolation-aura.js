
import { Entity, Physics } from 'l1'

import follow from './behaviors/follow'
import { updateHealth } from './health'

const immolationType = 'immolationType'
const immolationIdPrefix = 'immolation '
const radius = 80

const burnDps = -10
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

  return immolation
}

const formatImmolationTargetType = targetId =>
  'immolationTarget: ' + targetId

const formatImmolationType = id =>
  'immolation: ' + id

const burn = (src, target) => {
  target.entity.health = updateHealth(target.entity.health, dmgPerTick)
}

export { initImmolationAura, formatImmolationTargetType }
