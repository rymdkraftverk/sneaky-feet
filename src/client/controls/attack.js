import { Key, Gamepad, Physics, Timer } from 'l1'
import { axes, buttons } from '../util/gamepad'
import { fireKnockBack } from '../knockback'
import { playerIds } from '../spawn_players'

const getTarget = (id) => {
  if (Gamepad.isPressed(id, buttons.a) || Key.isDown('a')) return playerIds.player1
  if (Gamepad.isPressed(id, buttons.x) || Key.isDown('x')) return playerIds.player2
  if (Gamepad.isPressed(id, buttons.y) || Key.isDown('y')) return playerIds.player3
  if (Gamepad.isPressed(id, buttons.b) || Key.isDown('b')) return playerIds.player4
}

const keyboardCheck = (id) => {
  if (id !== 0 ) return false
  return (Key.isDown('a') || Key.isDown('b') || Key.isDown('x') || Key.isDown('y'))
}

export default (id) => ({
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
      if (Gamepad.isPressed(id, buttons.lb) || keyboardCheck(id)) {
        // Player is holding attack
        const target = getTarget(id)
        console.log('target', target)
        if (target) {
          const { x, y} = e.body.position
          fireKnockBack(target, { x, y })
          console.log('attacked: ' + target)
          b.active = false
        }
      }
    }
  },
})
