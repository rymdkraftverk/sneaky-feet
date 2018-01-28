import { Key, Gamepad, Physics } from 'l1'
import { axes, buttons } from '../util/gamepad'

const THRESHOLD = 0.2
const WALKING_SPEED = 4
const JUMPING_SPEED = -11

const checkThreshold = (value) => {
  return (Math.abs(value) > THRESHOLD)
}

const keyboardCheck = (id) => {
  return Key.isDown('space') && id === 0
}

export default (id) => ({
  walkingSpeed: WALKING_SPEED,
  enabled: true,
  run: (b, e) => {
    if (!b.enabled) return
    const getNewX = () => {
      const value = Gamepad.axisDir(id, axes.leftH)
      if (!value) return null
      if (!checkThreshold(value)) {
        if (e.walkingRight || e.walkingLeft) {
          e.setWalking(e, null)
        }
        e.walkingLeft = false
        e.walkingRight = false
        return null
      }
      if (value < THRESHOLD) {
        if (!e.walkingLeft) {
          e.setWalking(e, 'left')
        }
        e.walkingLeft = true
        e.walkingRight = false
        return -1 * b.walkingSpeed / 4
      } else if (value > THRESHOLD) {
        if (!e.walkingRight) {
          e.setWalking(e, 'right')
        }
        e.walkingLeft = false
        e.walkingRight = true
        return b.walkingSpeed / 4
      }
    }
    
    const getNewY = () => {
      if (!Gamepad.isPressed(id, buttons.lb) && e.onGround && (keyboardCheck(id) || Gamepad.isPressed(id, buttons.a))) {
        return JUMPING_SPEED
      } else {
        return null
      }
    }
    
    const oldX = e.body.velocity.x
    const oldY = e.body.velocity.y
    const controllerXOutput = getNewX()
    let newX = oldX + (controllerXOutput || 0)
    let newY = oldY + (getNewY() || 0)

    if(e.onGround && !controllerXOutput) {
      if(oldX > 0) {
        newX = Math.max(0, oldX - b.walkingSpeed)
      }
      if(oldX < 0) {
        newX = Math.min(0, oldX + b.walkingSpeed)
      }
    }

    if(Math.abs(newX) > b.walkingSpeed) {
      if(Math.abs(newX) > Math.abs(oldX)) {
        if(oldX > 0) {
          newX = Math.min(b.walkingSpeed, newX)
        }
        if(oldX < 0) {
          newX = Math.max(-1 * b.walkingSpeed, newX)
        }
      }
    }

    if(newY < JUMPING_SPEED) {
      newY = Math.max(newY, JUMPING_SPEED)
    }

    Physics.Body.setVelocity(e.body, {
      y: newY,
      x: newX,
    })
  },
})
