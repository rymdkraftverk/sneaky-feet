import { Entity } from 'l1'

const chat_duration = 100
const threshold = 0.999

export default id => ({
  chat: b => {
    b.chat_remaining--
    if(b.chat_remaining > 0) return
    b.sprite.visible = false
  },
  init_chat: b => {
    if(b.sprite.visible) return
    b.sprite.visible = true
    b.chat_remaining = chat_duration
  },
  init: b => {
    const baloon = Entity.create(`baloon_snige_fodder_${id}`)
    b.sprite = Entity.addSprite(baloon, 'prat-bubble')
  },
  run: (b, e) => {
    const r = Math.random()
    b.sprite.x = e.sprite.x - e.sprite.width + 70
    b.sprite.y = e.sprite.y - e.sprite.height - 55

    if(b.sprite.visible) b.chat(b)
    if(r > threshold) b.init_chat(b)
  },
})
