import { Key, Gamepad, Physics } from 'l1'

export default () => ({
  run: (b, e) => {
    const getNewPos = () => {
      if (Key.isDown('left')) {
        e.walking = true
        return {
          ...e.body.position,
          x: e.body.position.x - 4,
        }
      }
      else if (Key.isDown('right')) {
        e.walking = true
        return {
          ...e.body.position,
          x: e.body.position.x + 4,
        }
      } else {
        e.walking = false
      }

    }
    const newPos = getNewPos()
    if (newPos) {
      Physics.Body.setPosition(e.body, newPos)
    }
  },
})
