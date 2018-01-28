import { Entity, Physics, Timer } from 'l1'
import { open_ulti_door } from './map'

const DELAY = 1000

const createUltimatorOne = ({ x, y }) => {
  const sprite = Entity.addSprite(entity, 'ultimator-1')
  entity.behaviors.rotate = {
    run: (b, e) => {
      e.sprite.rotation -= 0.08
      e.sprite.anchor.set(0.489)
    },
  }
  sprite.x = x
  sprite.y = y
  sprite.scale.set(4.1)
}

const createUltimatorTwo = ({ x, y }) => {
  const entity = Entity.create('ultimator-2')
  const sprite = Entity.addSprite(entity, 'ultimator-2')
  entity.behaviors.rotate = {
    run: (b, e) => {
      e.sprite.rotation += 0.1
      e.sprite.anchor.set(0.4885)
    },
  }
  sprite.x = x
  sprite.y = y
  sprite.scale.set(4)
}


const createUltimator = ({ x, y }) => {
  createUltimatorOne({ x, y })
  createUltimatorTwo({ x, y })
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
      Entity.addBody(e, Physics.Bodies.circle(pos.x, pos.y, 40, { isStatic: true }))
      b.sprite = s
      b.countdown = Timer.create(DELAY)
      b.alive = false
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

