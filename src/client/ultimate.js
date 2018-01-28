import { Entity, Physics, Timer } from 'l1'
import { open_ulti_door } from './map'

const DELAY = 1000

export default pos => {
  const e = Entity.create('ultimate')
  e.behaviors.life = {
    init: b => {
      b.sprite = Entity.addSprite(e, 'square')
      b.sprite.scale.set(4)

      Entity.addBody(e, Physics.Bodies.circle(pos.x, pos.y, 40, { isStatic: true }))
      b.countdown = Timer.create(DELAY)

      b.alive = false
      b.sprite.visible = false
    },
    run: b => {
      if(!b.alive && b.countdown.run()) {
        b.alive = true
        b.sprite.visible = true
        open_ulti_door()
      }
    },
  }
}

