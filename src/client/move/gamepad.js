import { Key, Gamepad, Physics } from 'l1'
import { axes } from '../util/gamepad'

const THRESHOLD = 0.2

const checkThreshold = (value) => {
  return (Math.abs(value) > THRESHOLD)
}

export default () => ({
  run: (b, e) => {
    const getNewPos = () => {
      const value = Gamepad.axisDir(0, axes.leftH)
      if (!value) return null
      if (!checkThreshold(value)) return null

      if (value < 0) {
        return {
          ...e.body.position,
          x: e.body.position.x - 2,
        }
      }
      else if (value > 0) {
        return {
          ...e.body.position,
          x: e.body.position.x + 2,
        }
      }

    }
    const newPos = getNewPos()
    if (newPos) {
      Physics.Body.setPosition(e.body, newPos)
    }
  },
})
