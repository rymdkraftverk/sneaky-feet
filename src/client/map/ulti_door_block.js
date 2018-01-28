import { Entity, Physics, Timer } from 'l1'

const type = 'ulti_door_block'
const id = i => `${type}_${i}`
const spriteName = 'base-platform-block-1'
const height = 20
const width = 45

const OPENING_TIME = 120

const opening = () => ({
  timer: Timer.create(OPENING_TIME),
  opening: true,
  run: (b, e) => {
    if (b.opening) {
      Physics.Body.setPosition(e.body, {
        x: e.body.position.x,
        y: e.body.position.y + 1,
      })
      if(b.timer.run()) {
        b.opening = false
      }
    }
  },
})

const init = (i, { x, y }) => {
  const block = Entity.create(id(i))
  Entity.addSprite(block, spriteName)
  Entity.addBody(block, Physics.Bodies.rectangle(x, y, width, height, { isStatic: true }))
  Entity.addType(block, type)
  Entity.addType(block, 'floor_block')
  block.open = () => {
    block.behaviors.opening = opening()
  }

  return block
}

export default init
