import { Entity } from 'l1'

const player_sprites = {
  player1: 'lizard1',
  player2: 'lizard1-p2',
  player3: 'lizard1-p3',
  player4: 'lizard1-p4',
}

const position = i => ({
  x: 1230 + 100 * i,
  y: 30,
})

const player_targets = players => players.map(x => (
  {
    [x.id]: x.target_id,
  }
)).reduce((a, b) => Object.assign(a, b))

const ordered = (first_id, targets, length) => {
  const order = [first_id]
  for (let i = 1; i <= (length - 1); i++) {
    const prev = order[order.length - 1]
    const hunter = targets[prev]
    order.push(hunter)
  }
  return order
}

const refreshed_targets = length => {
  const players = Entity.getByType('playerType')
  const targets = player_targets(players)
  return ordered(players[0].id, targets, length)
    .map(x => player_sprites[x])
    .map((x, i) => ({ sprite: x, pos: position(i) }))
}

const refresh_sign = length => {
  refreshed_targets(length).forEach((x, i) => {
    const e = Entity.create(`target_${i}`)
    const sprite = Entity.addSprite(e, x.sprite)
    sprite.scale.set(5)
    sprite.position.x = x.pos.x
    sprite.position.y = x.pos.y
  })
}

export default refresh_sign
