import { Key, Gamepad, Physics } from 'l1'
import { axes, buttons } from '../util/gamepad'

const THRESHOLD = 0.2

const checkThreshold = (value) => {
  return (Math.abs(value) > THRESHOLD)
}

const keyboardCheck = (id) => {
  return Key.isDown('space') && id === 0
}

export default (id) => ({
  run: (b, e) => {
    const getNewX = () => {
      const value = Gamepad.axisDir(id, axes.leftH)
      if (!value) return null
      if (!checkThreshold(value)) return null

      if (value < 0) {
        return -4
      } else if (value > 0) {
        return 4
      } else {
        return null
      }

    }
    
    const getNewY = () => {
      if (!Gamepad.isPressed(id, buttons.lb) && e.onGround && (keyboardCheck(id) || Gamepad.isPressed(id, buttons.a))) {
        return -12
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
