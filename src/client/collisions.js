import { Entity } from 'l1'

export default () => {
  Entity.addCollision('playerType', ['map_block'], (bodyA) => {
    // Player
    bodyA.entity.onGround = true
  })
  Entity.addCollision('playerType', ['map_block'], (bodyA) => {
    // Player
    bodyA.entity.onGround = false
  }, 'collisionEnd')
}
