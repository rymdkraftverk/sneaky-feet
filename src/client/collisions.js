import { Entity } from 'l1'

export const categories = {
  default: 0x0001, 
  characters: 0x0002,
}

export default () => {
  Entity.addCollision('playerType', ['floor_block'], (bodyA) => {
    // Player
    bodyA.entity.onGround = true
  })
  Entity.addCollision('playerType', ['floor_block'], (bodyA) => {
    // Player
    bodyA.entity.onGround = false
  }, 'collisionEnd')
}
