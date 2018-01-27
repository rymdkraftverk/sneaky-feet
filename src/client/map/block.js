import { Entity, Physics } from 'l1'
import { categories } from '../collisions'

const type = 'map_block'
const id = i => `${type}_${i}`
const spriteName = 'base-platform-block-1'
const height = 20
const width = 45

const init = (i, { x, y }) => {
  const block = Entity.create(id(i))
  Entity.addSprite(block, spriteName)
  Entity.addBody(block, Physics.Bodies.rectangle(x, y, width, height, {
    isStatic: true,
    collisionFilter: {
      category: categories.default,
      mask: categories.default | categories.characters,
    },
  }))
  Entity.addType(block, type)

  return block
}

export default init
