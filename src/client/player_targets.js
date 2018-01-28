import { Entity, Util, Timer } from 'l1'
import { big } from './util/text'

const player_sprites = {
  player1: 'lizard1',
  player2: 'lizard1-p2',
  player3: 'lizard1-p3',
  player4: 'lizard1-p4',
}

const prep_text = 'HUNT THE LIZARD!' //'JAGTORDRE'
const prep_position = i => ({
  x: 50 + 340 * i,
  y: 400,
})

const battle_position = i => ({
  x: 1230 + 50 * i,
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

const refreshed_targets = (length, positions) => {
  const players = Entity.getByType('playerType')
  const targets = player_targets(players)
  return ordered(players[0].id, targets, length)
    .map(x => player_sprites[x])
    .map((x, i) => ({ sprite: x, pos: positions(i) }))
}

const clear_prep_sign = () => {
  Entity.destroy(Entity.get('prep_text'))
  const signs = Entity.getByType('prep_sign')
  signs.forEach((entity, i) => {
    const target = battle_position(i)
    const { sprite: { position } } = entity
    let targetScale, x, y
    if (entity.types.includes('prep_arrow')){
      targetScale = 1
      x = target.x + 18
      y = target.y + 18
    } else {
      targetScale = 5
      x = target.x
      y = target.y
    }
    entity.behaviors.moveSign = moveSign(position.x, position.y, x, y, targetScale)
  })
}

const MOVE_TIME = 30

const makeGetScale = (distance, start, end) => (x) => {
  return ((end - start) / distance) * x + start
}

const moveSign = (startX, startY, endX, endY, targetScale) => ({
  timer: Timer.create(MOVE_TIME),
  init: (b, e) => {
    b.totalDistance = Util.getDistance(startX, startY, endX, endY)
    b.startingScale = e.sprite.scale
    b.speedX = Math.floor(Math.abs(endX - startX) / MOVE_TIME)
    b.speedY = Math.floor(Math.abs(endY - startY) / MOVE_TIME)
    b.getScale = makeGetScale(b.totalDistance, e.sprite.scale.x, targetScale)
  },
  run: (b, e) => {
    const distance = Util.getDistance(e.sprite.x, e.sprite.y, endX, endY)
    if (e.sprite.x < endX) {
      e.sprite.x += b.speedX
    }

    if (e.sprite.y > endY) {
      e.sprite.y -= b.speedY
    }

    e.sprite.scale.set(b.getScale(b.totalDistance - distance))
    if (b.timer.run()) {
      e.sprite.scale.set(targetScale)
      e.sprite.x = endX
      e.sprite.y = endY
      delete e.behaviors.moveSign
    }
  },
})


const prep_sign = length => {
  // text
  const et = Entity.create('prep_text')
  Entity.addType(et, 'prep_sign')
  const text = Entity.addText(et, prep_text, big('#ddd', 100), { zIndex: 100 })
  text.position.x = 100
  text.position.y = 300

  refreshed_targets(length, prep_position).forEach((x, i) => {
    // lizards
    const e = Entity.create(`prep_target_${i}`)
    Entity.addType(e, 'prep_sign')

    const sprite = Entity.addSprite(e, x.sprite, {zIndex: 100})
    sprite.position.x = x.pos.x
    sprite.position.y = x.pos.y
    sprite.scale.set(20)

    // arrows
    if (length - 1 !== i) {
      const eSign = Entity.create(`target_arrow_${i}`)
      Entity.addType(eSign, 'prep_sign')
      Entity.addType(eSign, 'prep_arrow')
      const signSprite = Entity.addSprite(eSign, 'arrow', {zIndex: 100})
      signSprite.position.x = x.pos.x + 250
      signSprite.position.y = x.pos.y + 90
      signSprite.scale.set(3)
    }
  })
}

const refresh_sign = length => {
  clear_prep_sign()
  // refreshed_targets(length, battle_position).forEach((x, i) => {
  //   const e = Entity.create(`target_${i}`)
  //   const sprite = Entity.addSprite(e, x.sprite)
  //   sprite.position.x = x.pos.x
  //   sprite.position.y = x.pos.y
  //   sprite.scale.set(5)

  //   if (length - 1 !== i) {
  //     const eSign = Entity.create(`target_arrow_${i}`)
  //     const signSprite = Entity.addSprite(eSign, 'arrow')
  //     signSprite.position.x = x.pos.x + 70
  //     signSprite.position.y = x.pos.y + 15
  //   }
  // })
}

export { prep_sign, refresh_sign }
