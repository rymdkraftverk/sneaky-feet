import { Entity, Physics } from 'l1'

const type = 'floor_block'
const id = i => `${type}_${i}`
const spriteName = 'base-platform-block-1'
const height = 20
const width = 45

const init = (i, { x, y }) => {
  const block = Entity.create(id(i))
  Entity.addSprite(block, spriteName)
  Entity.addBody(block, Physics.Bodies.rectangle(x, y, width, height, { isStatic: true }))
  Entity.addType(block, type)

  return block
}

export default init
