import { Entity, Timer, Util, Physics, Sound } from 'l1'
import _ from 'lodash'
import { createPortalPair } from './portal'

const portalPositions = [
  { x: 200, y: 200},
  { x: 800, y: 300},
  { x: 800, y: 800},
  { x: 1200, y: 200},
]

const getObjects = (a, b) => {
  if (a.entity.types.includes('portal')) {
    return { portal: a, player: b }
  }
  return { portal: b, player: a }
}

const portalCollision = (a, b) => {
  const { portal, player } = getObjects(a, b)
  if (!portal.entity.portalEnabled) {
    return
  }

  portal.entity.portalEnabled = false
  portal.entity.portalPair.portalEnabled = false
  Entity.get('portalCreator').portalsActive = false

  const x = portal.entity.portalPair.body.position.x
  const y = portal.entity.portalPair.body.position.y
  
  const onFinish = () => {
    Entity.destroy(portal.entity.portalPair)
    Entity.destroy(portal.entity)
  }
  player.entity.behaviors.portalTravelling = portalTravelling(x, y, onFinish) 
  Sound.getSound('./sound/portal2.wav', { volume: 0.3 }).play()
}


export default () => {
  const portalCreator = Entity.create('portalCreator')
  portalCreator.behaviors.portalCreatorB = portalCreatorB()
  portalCreator.portalsActive = false

  Entity.addCollision(
    'portal',
    ['playerType'],
    portalCollision
  )
}

const portalCreatorB = () => ({
  run: (b, e) => {
    if (e.portalsActive) return
    if (!b.timeToNextPortal) {
      const time = Util.getRandomInRange(200, 400)
      b.timeToNextPortal = Timer.create(time)
    }
    if (b.timeToNextPortal && b.timeToNextPortal.run()) {
      e.portalsActive = true
      const portalsToCreate = _.sampleSize(portalPositions, 2)
      createPortalPair('portal1', 'portal2', {
        ax: portalsToCreate[0].x,
        ay: portalsToCreate[0].y,
        bx: portalsToCreate[1].x,
        by: portalsToCreate[1].y,
      })
      delete b.timeToNextPortal
    }
  },
})

const portalTravelling = (x, y, onFinish) => ({
  time: 15,
  init: (b, e) => {
    Physics.Body.setStatic(e.body, true)
    b.originalScale = e.sprite.scale.x
    b.timeToDisappear = Timer.create(b.time)
  },
  run: (b, e) => {
    if (b.timeToDisappear && e.sprite.scale.x > 0) {
      e.sprite.scale.x -= 0.5
    }
    if (b.timeToDisappear && b.timeToDisappear.run()) {
      b.timeToAppear = Timer.create(b.time)
      Physics.Body.setPosition(e.body, { x, y })
      delete b.timeToDisappear
    }
    
    const scaleFactor = (time) => {
      return time / b.time
    }
    if (!b.timeToDisappear && b.timeToAppear) {
      e.sprite.scale.x = scaleFactor(b.timeToAppear.counter()) * b.originalScale
    }  
    if (b.timeToAppear && b.timeToAppear.run()) {
      onFinish()
      delete e.behaviors.portalTravelling
      Physics.Body.setStatic(e.body, false)
    }
  },
})
