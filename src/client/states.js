import { Entity } from 'l1'
import menu from './menu'

export const states = {
  MENU: 'menuState',
  BATTLE: 'battleState',
}

export function battleState() {
  Entity.getByType(states.MENU).forEach(Entity.destroy)

}

export function menuState() {
  Entity.getByType(states.BATTLE).forEach(Entity.destroy)

  menu()
}

