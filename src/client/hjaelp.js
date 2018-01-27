import { Entity } from 'l1'

export default id => ({
  init: b => {
    const baloon = Entity.create(`baloon_hjaelp_${id}`)
    b.sprite = Entity.addSprite(baloon, 'help-bubble', {zIndex: 99})
  },
  run: (b, e) => {
    b.sprite.x = e.sprite.x - e.sprite.width + 70
    b.sprite.y = e.sprite.y - e.sprite.height - 15
    if (e.health.hp < 30) {
      b.sprite.visible = true
    } else {
      b.sprite.visible = false
    }
  },
})
