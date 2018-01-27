import { Entity, Physics } from 'l1'

const drop_off = {
  x: 200,
  y: 200,
}

const border = {
  x1: 0,
  y1: 0,
  x2: 2000,
  y2: 2000,
}

const escaped = pos =>
  pos.x < border.x1 ||
  pos.x > border.x2 ||
  pos.y < border.y1 ||
  pos.y > border.y2

const init = () => {
  const e = Entity.create('border_patrol')
  e.behaviors.patrol = {
    run: () => {
      const players = Entity.getByType('playerType')
      const escapee = players.find(p => escaped(p.body.position))
      if(!escapee) return
      console.log('escapee detected!')
      console.log(escapee)
      Physics.Body.setPosition(escapee.body, drop_off)
      Physics.Body.setVelocity(escapee.body, {x: 0, y: 0})
    },
  }
}

export default init
