
import { Entity, Physics } from 'l1'

const add = Physics.Vector.add
const sub = Physics.Vector.sub
const mult = Physics.Vector.mult
const normalise = Physics.Vector.normalise

const forceFactor = 0.005

export default targetId => {
  let triggers = 0
  return {
    run: (behavior, stalker) => {
      const target = Entity.get(targetId)
      const forceDirection = normalise(sub(target.body.position, stalker.body.position))

      triggers++
      stalker.body.force.x = forceDirection.x * forceFactor
      // negative force i y-axis to counteract gravity
      stalker.body.force.y = forceDirection.y * forceFactor - stalker.body.mass * 0.001
    },
  }
}
