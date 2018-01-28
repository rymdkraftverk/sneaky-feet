import { Entity, Timer } from 'l1'

const DEAD_TIMEOUT = 120

export default (x, y, layingDownSprite, onEnd) => {
  const entity = Entity.create('deadLizard')
  const sprite = Entity.addAnimation(entity, ['lizard-dead-1', 'lizard-dead-2'], 0.08)
  sprite.position.x = x - 20
  sprite.position.y = y - 124
  sprite.scale.set(5)
  entity.behaviors.deadLizardB = deadLizardB(onEnd)

  const layingDown = Entity.create('layingDownLizard')
  const layingDownS = Entity.addSprite(layingDown, layingDownSprite)
  layingDownS.position.x = x - 16
  layingDownS.position.y = y + 24
  layingDownS.scale.set(5)
  layingDownS.rotation = -(Math.PI / 2)
}

const deadLizardB = (onEnd) => ({
  timer: Timer.create(DEAD_TIMEOUT),
  init: (b, e) => {

  },
  run: (b, e) => {
    e.sprite.position.y -= 1
    if (b.timer.run()) {
      Entity.destroy(e)
      onEnd()
    }
  },
})
