import { Entity, Physics, Timer } from 'l1'
import { open_ulti_door } from './map'
import { categories } from './collisions'

const DELAY = 2000

const pickup = (a, b) => {
  if(!(a && b)) return
  a = a.entity
  b = b.entity
  const ultimate = [a, b].find(x => x.id === 'ultimate')
  const player = [a, b].find(x => x.id != 'ultimate')

  Entity.destroy(ultimate.ultimatorInner)
  Entity.destroy(ultimate)

  player.behaviors.gamepad.walkingSpeed = 8
}

export default pos => {
  const e = Entity.create('ultimate')
  e.ultimatorInner = Entity.create('ultimator-inner')
  const innerSprite = Entity.addSprite(e.ultimatorInner, 'ultimator-2')
  e.ultimatorInner.behaviors.rotate = {
    run: (b, e) => {
      e.sprite.rotation += 0.1
      e.sprite.anchor.set(0.4885)
    },
  }
  innerSprite.x = pos.x
  innerSprite.y = pos.y
  innerSprite.scale.set(4)
  innerSprite.visible = false
  const s = Entity.addSprite(e, 'ultimator-1')

  s.scale.set(4)
  s.visible = false

  e.behaviors.rotate = {
    run: (b, e1) => {
      e1.sprite.rotation -= 0.08
      e1.sprite.anchor.set(0.489)
    },
  }

  e.behaviors.life = {
    init: b => {
      Entity.addBody(
        e,
        Physics.Bodies.circle(pos.x, pos.y, 40, {
          isStatic: true,
          isSensor: true,
          category: categories.characters,
          mask: categories.default,
        })
      )
      b.sprite = s
      Entity.addType(e, 'ultimate')
      b.countdown = Timer.create(DELAY)
      b.alive = false
      b.sprite.visible = false

      Entity.addCollision(
        'ultimate',
        ['playerType'],
        pickup
      )
    },
    run: b => {
      if (!b.alive && b.countdown.run()) {
        b.alive = true
        b.sprite.visible = true
        e.ultimatorInner.sprite.visible = true
        open_ulti_door()
      }
    },
  }
}

