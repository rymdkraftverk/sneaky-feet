import { Entity, Physics, Timer } from 'l1'

const DELAY = 60

export default pos => {
  const e = Entity.create('ultimate')
  e.behaviors.life = {
    init: b => {
      b.sprite = Entity.addSprite(e, 'square')
      b.sprite.visible = false
      Entity.addBody(e, Physics.Bodies.circle(pos.x, pos.y, 40, { isStatic: true }))
      b.countdown = Timer.create(DELAY)
    },
    run: b => {
      if(b.countdown.run()) {
        b.sprite.visible = true
      }
    },
  }
}
