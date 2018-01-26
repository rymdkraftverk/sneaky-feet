import { Entity } from 'l1'
import lobby from './lobby'

export const states = {
  LOBBY: 'lobbyState',
  BATTLE: 'battleState',
}

export function battleState() {
  Entity.getByType(states.LOBBY).forEach(Entity.destroy)

}

export function lobbyState() {
  Entity.getByType(states.BATTLE).forEach(Entity.destroy)

  lobby()
}
