import { Entity, Physics } from 'l1'

export default id => ({
  run: (behavior, follower) => {
    const target = Entity.get(id)
    Physics.Body.setPosition(follower.body, target.body.position)
  },
})
