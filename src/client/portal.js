import { Entity, Physics } from 'l1'
import { categories } from './collisions'

const animation = ['portal']
const playerType = 'portal'

const createPortal = (id, x, y) => {
  const entity = Entity.create(id)
  entity.portalEnabled = true
  const sprite = Entity.addAnimation(entity, animation, 0.05, { zIndex: -10 })
  Entity.addType(entity, playerType)
  Entity.addBody(entity, Physics.Bodies.rectangle(x, y, 60, 80, { isStatic: true, isSensor: true, category: categories.characters } ))
  sprite.x = x
  sprite.y = y
  sprite.scale.set(4)

  return entity
}

const createPortalPair = (aId, bId, { ax, ay, bx, by }) => {
  const portalA = createPortal(aId, ax, ay)
  const portalB = createPortal(bId, bx, by)

  portalA.portalPair = portalB
  portalB.portalPair = portalA

  return { portalA, portalB }
}

export { createPortalPair }
