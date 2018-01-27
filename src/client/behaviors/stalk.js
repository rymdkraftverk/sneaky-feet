
import { Entity, Physics, Util } from 'l1'

const sub = Physics.Vector.sub
const normalise = Physics.Vector.normalise

const forceFactor = 60

export default targetId => {
  return {
    run: (behavior, stalker) => {
      const target = Entity.get(targetId)
      const forceDirection = normalise(sub(target.body.position, stalker.body.position))

      const angle = Util.getAngle(
        target.body.position.x,
        target.body.position.y,
        stalker.body.position.x,
        stalker.body.position.y
      )

      stalker
        .sprite
        .rotation = angle

      Physics.Body.setVelocity(stalker.body, {x: (forceDirection.x * forceFactor), y: (forceDirection.y * forceFactor)})
      // negative force i y-axis to counteract gravity
      stalker.body.force.y = stalker.body.mass * 0.001
    },
  }
}
