import { Entity, Physics } from 'l1'

import stalk from './behaviors/stalk'

const spriteName = 'square'

const formatType = projectile =>
  projectile.id

const formatKnockBackTargetType = id =>
  'about to get knocked the fuck out ' + id

const knockBack = (player, projectile) => {
  Entity.destroy(projectile.entity)
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
    knockBack
  )

  projectile.behaviors.stalk = stalk(targetId)
}

export { fireKnockBack, formatKnockBackTargetType }