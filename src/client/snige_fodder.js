import { Entity } from 'l1'

export default id => ({
  init: b => {
    const baloon = Entity.create(`baloon_${id}`)
    b.sprite = Entity.addSprite(baloon, 'prat-bubble')
  },
  run: (b, e) => {
    b.sprite.x = e.sprite.x - e.sprite.width + 100
    b.sprite.y = e.sprite.y - e.sprite.height - 70
    if (e.health.hp < 20) {
      b.sprite.visible = true
    } else {
      b.sprite.visible = false
    }
  },
})
