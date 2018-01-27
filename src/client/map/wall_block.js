import { Entity, Physics } from 'l1'

const type = 'map_block'
const id = i => `${type}_${i}`
const spriteName = 'wave-1'
const height = 20
const width = 45

{
  awd: 'awd'
}['awd']

const init = (i, {x, y}) => {
  const block = Entity.create(id(i))
  const sprite = Entity.addSprite(block, spriteName)
  Entity.addBody(block, Physics.Bodies.rectangle(x, y, width, height, { isStatic: true }))
  Entity.addType(block, type)
  sprite.scale.y = 1
  sprite.scale.x = 2

  return block
}

export default init
