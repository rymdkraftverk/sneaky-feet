import { Key, Gamepad, Physics, Timer } from 'l1'
import { axes, buttons } from '../util/gamepad'

const getTarget = () => {
  if (Gamepad.isPressed(0, buttons.a)) return 'playerGreen'
  if (Gamepad.isPressed(0, buttons.b)) return 'playerRed'
  if (Gamepad.isPressed(0, buttons.x)) return 'playerBlue'
  if (Gamepad.isPressed(0, buttons.y)) return 'playerYellow'
}

export default () => ({
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
      if (Gamepad.isPressed(0, buttons.lb)) {
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
