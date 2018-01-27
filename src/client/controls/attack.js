import { Key, Gamepad, Physics, Timer } from 'l1'
import { axes, buttons } from '../util/gamepad'

const getTarget = (id) => {
  if (Gamepad.isPressed(id, buttons.a)) return 'playerGreen'
  if (Gamepad.isPressed(id, buttons.b)) return 'playerRed'
  if (Gamepad.isPressed(id, buttons.x)) return 'playerBlue'
  if (Gamepad.isPressed(id, buttons.y)) return 'playerYellow'
}

export default (id) => ({
  active: false,
  cooldown: Timer.create(60),
  init: (b, e) => {

  },
  run: (b, e) => {
    if (b.cooldown.run()){
      b.active = true
      b.cooldown.reset()
    }
    if (b.active) {
      if (Gamepad.isPressed(id, buttons.lb)) {
        // Player is holding attack
        const target = getTarget()
        if (target) {
          console.log('attacked: ' + target)
          b.active = false
        }
      }
    }
  },
})
