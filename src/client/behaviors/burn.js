
import { Entity } from 'l1'

import { updateHealth } from '../health'

const burnDps = -10
const ticksPerSec = 60
const dmgPerTick = burnDps / ticksPerSec

export default id => ({
  run: () => {
    const target = Entity.get(id)
    target.health = updateHealth(target.health, dmgPerTick)
  },
})
