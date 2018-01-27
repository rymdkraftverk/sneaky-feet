import { Entity, Physics } from 'l1'

import stalk from './behaviors/stalk'

const spriteName = 'transmission-ball'

const add = Physics.Vector.add
const sub = Physics.Vector.sub
const mult = Physics.Vector.mult
const normalise = Physics.Vector.normalise
const magnitude = Physics.Vector.magnitude

const forceFactor = 25
const explosionRadius = 300

const explosionAnimation = [
  'transmission-wave-1',
  'transmission-wave-2',
  'transmission-wave-3',
  'transmission-wave-4',
  'transmission-wave-5',
]

const formatType = projectile =>
  projectile.id

const formatKnockBackTargetType = id =>
  'about to get knocked the fuck out ' + id

const getHunterId = (potentialHunterId, targetId) => {
  const potentialHunter = Entity
    .get(potentialHunterId)

  if(potentialHunter.target_id == targetId)
  {
    return potentialHunter.id
  }

  return getHunterId(potentialHunter.target_id, targetId)
}

const knockBack = targetId => (obj1, obj2) => {
  const toProtect = obj1.entity.health
    ? obj1.entity
    : obj2.entity

  const projectile = obj1.entity.health
    ? obj2.entity
    : obj1.entity

  const hunterId = getHunterId(toProtect.id, targetId)
  const hunter = Entity.get(hunterId)

  const distance = sub(hunter.body.position, toProtect.body.position)
  const absoluteDistance = magnitude(distance)
  const forceDirection = normalise(distance)

  const velocityUpdate = absoluteDistance < explosionRadius
    ? mult(forceDirection, forceFactor)
    : {x: 0, y: 0}

  const velocity = add(hunter.body.velocity, velocityUpdate)
  Physics.Body.setVelocity(hunter.body, velocity)

  Entity.destroy(projectile)

  renderExplosion(toProtect.body.position)
}

const renderExplosion = position => {
  const explosionBody = Physics
    .Bodies
    .circle(
      position.x,
      position.y,
      explosionRadius,
      {isStatic: true, isSensor: true}
    )

  const explosion = Entity
    .create(Math.random())

  const animation = Entity
    .addAnimation(explosion, explosionAnimation, 0.75, { zIndex: 100 })

  animation.scale.set(15)

  Entity.addBody(explosion, explosionBody)

  setTimeout(() => Entity.destroy(explosion), 200)
}

const createKnockBackProjectile = ({x, y}) => {
  const projectile = Entity.create(Math.random())
  const sprite = Entity.addSprite(projectile, spriteName)
  Entity.addBody(projectile, Physics.Bodies.circle(x, y, 30, {isSensor: true}))
  sprite.scale.set(1.5)
  sprite.anchor.y = 0.65

  Entity.addType(projectile, formatType(projectile))

  return projectile
}

const fireKnockBack = (targetId, {x, y}) => {
  const projectile = createKnockBackProjectile({x, y})

  Entity.addCollision(
    formatType(projectile),
    formatKnockBackTargetType(targetId),
    knockBack(targetId)
  )

  projectile.behaviors.stalk = stalk(targetId)
}

export { fireKnockBack, formatKnockBackTargetType }