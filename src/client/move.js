import { Key, Gamepad } from 'l1'
import { buttons } from './util/gamepad'

export default () => ({
  run: (b, e) => {
    if (Key.isDown('up') || Gamepad.isPressed(0, buttons.a)) {
      console.log('up is pressed')
    }
  },
})
