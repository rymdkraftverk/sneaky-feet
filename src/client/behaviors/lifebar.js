import { Game } from 'l1'

export default (parentSprite, width, height) => ({
  animationTime: 25,
  hide: false,
  init: (b, e) => {
    b.startingLife = e.health.hp
  },
  run: (b, e) => {
    if (b.hide) return

    if (e.health.hp === b.startingLife) return

    const y = parentSprite.y - parentSprite.height / 2 - 16
    const x = parentSprite.x - parentSprite.width / 2
    // Render life left
    const lifeToRenderWidth = (width / b.startingLife) * e.health.hp
    const gfx = Game.getGraphics()
    gfx.beginFill(0x599602, 1)
    gfx.drawRect(x, y, lifeToRenderWidth, height)

    // Render life missing from total life
    const lifeMissingWidth = (width / b.startingLife) * (b.startingLife - e.health.hp)
    const lifeMissingX = x + lifeToRenderWidth
    gfx.beginFill(0x000000, 1)
    gfx.drawRect(lifeMissingX, y, lifeMissingWidth, height)

    // Animate life change
    if (e.damageTaken > 0) {
      gfx.beginFill(0xff0000, 1)
      gfx.drawRect(x + lifeToRenderWidth, y, (width / b.startingLife) * e.damageTaken, height)
      e.damageTaken -= e.damageTaken / b.animationTime
    }
  },
})
