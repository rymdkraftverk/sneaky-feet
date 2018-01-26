import { Key, Gamepad, Physics } from 'l1'
import { axes } from './util/gamepad'

export default () => ({
  run: (b, e) => {
    const getNewPos = () => {
      if (Key.isDown('left') || Gamepad.axisDir(0, axes.leftH) && Gamepad.axisDir(0, axes.leftH) > 0.5) {
        return {
          ...e.body.position,
          x: e.body.position.x - 2,
        }
      }
      else if (Key.isDown('right') || Gamepad.axisDir(0, axes.leftH) && Gamepad.axisDir(0, axes.leftH) < 0.5) {
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
