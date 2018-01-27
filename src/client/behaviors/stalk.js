
import { Entity, Physics } from 'l1'

const sub = Physics.Vector.sub
const mult = Physics.Vector.mult
const normalise = Physics.Vector.normalise

const forceFactor = 0.05

export default targetId => {
  let triggers = 0
  return {
    run: (behavior, stalker) => {
      const target = Entity.get(targetId)
      const diff = normalise(sub(target.body.position, stalker.body.position))

      if(triggers % 60 == 0) {
        Physics.Body.applyForce(stalker.body, stalker.body.position, mult(diff, forceFactor))
        console.log(stalker.body.position)
      }
      triggers++
    },
  }
}
