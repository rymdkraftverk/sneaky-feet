import { Entity, Physics } from 'l1'
import { categories } from './collisions'

const animation = ['portal']
const playerType = 'portal'

const createPortal = (id, x, y) => {
  const entity = Entity.create(id)
  entity.portalEnabled = true
  const sprite = Entity.addAnimation(entity, animation, 0.05, { zIndex: 10 })
  Entity.addType(entity, playerType)
  Entity.addBody(entity, Physics.Bodies.rectangle(x, y, 60, 80, { isStatic: true, isSensor: true, category: categories.characters } ))
  sprite.x = x
  sprite.y = y
  sprite.scale.set(4)

  return entity
}

const getObjects = (a, b) => {
  if (a.entity.types.includes('portal')) {
    return { portal: a, player: b }
  }
  return { portal: b, player: a }
}

const portalCollision = (a, b) => {
  const { portal, player } = getObjects(a, b)
  if (!portal.entity.portalEnabled) {
    return
  }

  portal.entity.portalEnabled = false
  portal.entity.portalPair.portalEnabled = false
  Entity.get('portalCreator').portalsActive = false

  const x = portal.entity.portalPair.body.position.x
  const y = portal.entity.portalPair.body.position.y

  Entity.destroy(portal.entity.portalPair)
  Physics.Body.setPosition(player.entity.body, { x, y })
  Entity.destroy(portal.entity)
}

const createPortalPair = (aId, bId, { ax, ay, bx, by }) => {
  const portalA = createPortal(aId, ax, ay)
  const portalB = createPortal(bId, bx, by)

  portalA.portalPair = portalB
  portalB.portalPair = portalA

  Entity.addCollision(
    'portal',
    ['playerType'],
    portalCollision
  )

  Entity.addCollision(
    'portal',
    ['playerType'],
    portalCollision
  )

  return { portalA, portalB }
}

export { createPortalPair }
