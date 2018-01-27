import { Entity } from 'l1'

export default () => {
  const players = Entity.getByType('playerType')
  return players.map(x => ({id: x.id, target_id: x.target_id}))
}
