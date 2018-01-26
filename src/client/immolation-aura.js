
import { Entity, Physics } from 'l1'

import follow from './behaviors/follow'
import burn from './behaviors/burn'

const spriteName = 'square'
const immolationType = 'immolationType'
const immolationIdPrefix = 'immolation '
const radius = 80

const createImmolationAura = (ownerId, {x, y}) => {
  const immolation = Entity.create(immolationIdPrefix + ownerId)
  const sprite = Entity.addSprite(immolation, spriteName)
  Entity.addBody(immolation, Physics.Bodies.circle(x, y, radius, {isStatic: true, isSensor: true}))
  sprite.scale.set(5)
  sprite.anchor.y = 0.65

  Entity.addType(immolation, immolationType)

  return immolation
}

const initImmolationAura = (ownerId, targetId, {x, y}) => {
  const immolation = createImmolationAura(ownerId, {x, y})

  immolation.behaviors.follow = follow(ownerId)
  immolation.behaviors.burn = burn(targetId)

  return immolation
}

export { initImmolationAura }
