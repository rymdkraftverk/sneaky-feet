import { Gamepad, } from 'l1'

const { L1ControllerPreset, } = Gamepad

export default () => {
  Gamepad.addPreset(
    'Logitech RumblePad 2 USB (STANDARD GAMEPAD Vendor: 046d Product: c218)',
    new L1ControllerPreset().aliasButton(4, 'lb').aliasButton(9, 'start')
  )
  Gamepad.addPreset(
    'Xbox 360 Controller (XInput STANDARD GAMEPAD)',
    new L1ControllerPreset().aliasButton(4, 'lb').aliasButton(9, 'start')
  )
}
