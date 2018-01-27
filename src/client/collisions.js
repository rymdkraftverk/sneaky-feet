import { Entity } from 'l1'

export const categories = {
  default: 0x0001, 
  characters: 0x0002,
}

const setOnGround = (body, onGround) => {
  if (body.entity.types.includes('playerType')) {
    body.entity.onGround = onGround
  }
}


export default () => {
  Entity.addCollision('playerType', ['floor_block'], (bodyA, bodyB) => {
    setOnGround(bodyA, true)
    setOnGround(bodyB, true)
  })
  Entity.addCollision('playerType', ['floor_block'], (bodyA, bodyB) => {
    setOnGround(bodyA, false)
    setOnGround(bodyB, false)
  }, 'collisionEnd')
}
