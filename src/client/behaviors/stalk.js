
import { Entity, Physics } from 'l1'

const add = Physics.Vector.add
const sub = Physics.Vector.sub
const mult = Physics.Vector.mult
const normalise = Physics.Vector.normalise

const forceFactor = 60

export default targetId => {
  return {
    run: (behavior, stalker) => {
      const target = Entity.get(targetId)
      const forceDirection = normalise(sub(target.body.position, stalker.body.position))

      Physics.Body.setVelocity(stalker.body, {x: (forceDirection.x * forceFactor), y: (forceDirection.y * forceFactor)})
      // negative force i y-axis to counteract gravity
      stalker.body.force.y = stalker.body.mass * 0.001
    },
  }
}
