import { Entity, Timer } from 'l1'
import { prep_sign, refresh_sign } from './player_targets'

const DURATION = 240

export default (length, onEnd) => {
  console.log('PREPARE')

  const entity = Entity.create('battle_prep')
  entity.behaviors.battle_prep = battle_prep(length, onEnd)
}

const battle_prep = (length, onEnd) => ({
  timer: Timer.create(DURATION),
  init: () => {
    prep_sign(length)
  },
  run: (b, e) => {
    if (b.timer.run()) {
      Entity.destroy(e)
      refresh_sign(length)
      onEnd()
    }
  },
})
