import { Entity, Physics } from 'l1'

const spriteName = 'square'

const initPlayer = (id, {x, y}) => {
  const player = Entity.create(id)
  const sprite = Entity.addSprite(player, spriteName)
  Entity.addBody(player, Physics.Bodies.rectangle(x, y, 80, 80))
  sprite.scale.set(5)
  sprite.anchor.y = 0.65

  return player
}

export { initPlayer }
