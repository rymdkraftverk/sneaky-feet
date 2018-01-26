import { Key } from 'l1'

export default () => ({
  run: (b, e) => {
    if (Key.isDown('up')) {
      console.log('up is pressed')
    }
  },
})
