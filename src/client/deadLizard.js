import { Entity, Timer } from 'l1'

const DEAD_TIMEOUT = 150

export default (x, y, layingDownSprite, onEnd) => {
  const entity = Entity.create('deadLizard')
  const sprite = Entity.addAnimation(entity, ['lizard-dead-1', 'lizard-dead-2'], 0.08, { zIndex: 200 })
  sprite.position.x = x - 20
  sprite.position.y = y - 124
  sprite.scale.set(5)
  sprite.visible = false
  
  const createDeadLizard = () => {
    entity.behaviors.moveDeadLizard = moveDeadLizard()
  }

  entity.behaviors.deadLizardB = deadLizardB(onEnd, createDeadLizard)

  const layingDown = Entity.create('layingDownLizard')
  const layingDownS = Entity.addSprite(layingDown, layingDownSprite, { zIndex: 200 })
  layingDownS.position.x = x - 16
  layingDownS.position.y = y + 24
  layingDownS.scale.set(5)
  layingDownS.rotation = -(Math.PI / 2)
}

const moveDeadLizard = () => ({
  init: (b, e) => {
    e.sprite.visible = true
  },
  run: (b, e) => {
    e.sprite.position.y -= 1
  },
})
  

const deadLizardB = (onEnd, createDeadLizard) => ({
  timer: Timer.create(DEAD_TIMEOUT),
  timeBeforeDeadLizardAppears: Timer.create(30),
  init: (b, e) => {

  },
  run: (b, e) => {
    if (b.timer.run()) {
      Entity.destroy(e)
      onEnd()
    }
    if (b.timeBeforeDeadLizardAppears.run()) {
      createDeadLizard()
    }
  },
})
