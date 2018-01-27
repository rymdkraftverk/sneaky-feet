import { Entity, Timer, Util } from 'l1'
import _ from 'lodash'
import { createPortalPair } from './portal'

const portalPositions = [
  { x: 200, y: 200},
  { x: 800, y: 300},
  { x: 800, y: 800},
  { x: 1200, y: 200},
]

export default () => {
  const portalCreator = Entity.create('portalCreator')
  portalCreator.behaviors.portalCreatorB = portalCreatorB()
  portalCreator.portalsActive = false
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
