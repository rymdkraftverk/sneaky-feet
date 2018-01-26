import { Key, Gamepad, Physics } from 'l1'

const THRESHOLD = 0.2

const checkThreshold = (value) => {
  return (Math.abs(value) > THRESHOLD)
}

export default () => ({
  run: (b, e) => {
    const getNewPos = () => {
      if (Key.isDown('left')) {
        return {
          ...e.body.position,
          x: e.body.position.x - 2,
        }
      }
      else if (Key.isDown('right')) {
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
