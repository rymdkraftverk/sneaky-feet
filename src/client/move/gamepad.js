import { Key, Gamepad, Physics } from 'l1'
import { axes, buttons } from '../util/gamepad'

const THRESHOLD = 0.2
const GAMEPAD_ID = 0

const checkThreshold = (value) => {
  return (Math.abs(value) > THRESHOLD)
}

export default () => ({
  run: (b, e) => {
    const getNewX = () => {
      const value = Gamepad.axisDir(GAMEPAD_ID, axes.leftH)
      if (!value) return null
      if (!checkThreshold(value)) return null

      if (value < 0) {
        return -2
      } else if (value > 0) {
        return 2
      } else {
        return null
      }

    }
    
    const getNewY = () => {
      if (Gamepad.isPressed(GAMEPAD_ID, buttons.a)) {
        return -5
      } else {
        return null
      }
    }
    
    const newX = getNewX()
    const newY = getNewY()

    Physics.Body.setVelocity(e.body, {
      y: newY || e.body.velocity.y,
      x: newX || e.body.velocity.x,
    })
  },
})
