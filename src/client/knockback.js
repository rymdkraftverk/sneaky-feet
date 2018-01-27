import { Entity, Physics } from 'l1'

import stalk from './behaviors/stalk'

const spriteName = 'square'

const add = Physics.Vector.add
const sub = Physics.Vector.sub
const mult = Physics.Vector.mult
const normalise = Physics.Vector.normalise

const forceFactor = 50

const formatType = projectile =>
  projectile.id

const formatKnockBackTargetType = id =>
  'about to get knocked the fuck out ' + id

const knockBack = projectileId => (obj1, obj2) => {
  const projectile = obj1.entity.id == projectileId
    ? obj1.entity
    : obj2.entity

  const target = obj1.entity.id == projectileId
    ? obj2.entity
    : obj1.entity

  const forceDirection = normalise(sub(target.body.position, projectile.body.position))

  const velocity = add(target.body.velocity, mult(forceDirection, forceFactor))
  Physics.Body.setVelocity(target.body, velocity)

  Entity.destroy(projectile)
}

const createKnockBackProjectile = ({x, y}) => {
  const projectile = Entity.create(Math.random())
  const sprite = Entity.addSprite(projectile, spriteName)
  Entity.addBody(projectile, Physics.Bodies.circle(x, y, 30, {inertia: Infinity}))
  sprite.scale.set(5)
  sprite.anchor.y = 0.65

  Entity.addType(projectile, formatType(projectile))

  return projectile
}

const fireKnockBack = (targetId, {x, y}) => {
  const projectile = createKnockBackProjectile({x, y})

  Entity.addCollision(
    formatType(projectile),
    formatKnockBackTargetType(targetId),
    knockBack(projectile.id)
  )

  projectile.behaviors.stalk = stalk(targetId)
}

export { fireKnockBack, formatKnockBackTargetType }