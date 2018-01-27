import { Entity, Game, Util } from 'l1'
import _ from 'lodash'

import { initPlayer, player1Animation, player2Animation, player3Animation, player4Animation, player1Walking, player2Walking, player3Walking, player4Walking } from './player'
import keyboard from './controls/keyboard'
import gamepad from './controls/gamepad'
import attack from './controls/attack'

export const playerIds = {
  player1: 'player1',
  player2: 'player2',
  player3: 'player3',
  player4: 'player4',
}

const burnFrames = ['fire1', 'fire2', 'fire3']

const player_targets = player_ids => {
  const shuffled = _.shuffle(player_ids)
  return shuffled.map((id, i) => {
    const target_index = i === (player_ids.length - 1) ? 0 : i + 1
    const t = shuffled[target_index]
    return {[id]: t}
  }).reduce(Object.assign)
}

const player_templates = [
  {
    id: playerIds.player1,
    x: 400,
    y: 100,
    animation: player1Animation,
    walkingAnimation: player1Walking,
  },
  {
    id: playerIds.player2,
    x: 600,
    y: 100,
    animation: player2Animation,
    walkingAnimation: player2Walking,
  },
  {
    id: playerIds.player3,
    x: 800,
    y: 100,
    animation: player3Animation,
    walkingAnimation: player3Walking,
  },
  {
    id: playerIds.player4,
    x: 1500,
    y: 100,
    animation: player4Animation,
    walkingAnimation: player4Walking,
  },
]

export const spawnPlayers = (activePlayerIds, onDeath) => {
  const players = player_templates
    .filter(template => _.includes(activePlayerIds, template.id))

  const targets = player_targets(players.map(x => x.id))

  players.forEach((p, index) => {
    const player = initPlayer(
      p.id,
      targets[p.id],
      {x: p.x, y: p.y},
      onDeath(p.id),
      p.animation
    )
    player.behaviors.gamepad = gamepad(index)
    player.behaviors.attack = attack(index)
    player.behaviors.renderBurn = renderBurn(p.id)
    if(p.id === 'player1') {
      player.behaviors.renderWalking = renderWalking(p.walkingAnimation)
      // player.behaviors.renderJump = renderJump(p.id)
      player.behaviors.keyboard = keyboard()
    }
  })
}

const renderBurn = (id) => ({
  init: (b, e) => {
    const burn = Entity.create(`${id}Burn`)
    b.sprite = Entity.addAnimation(burn, burnFrames, 0.05, { zIndex: 100} )
    b.sprite.scale.set(4)
  },
  run: (b, e) => {
    b.sprite.x = e.sprite.x - e.sprite.width / 2
    b.sprite.y = e.sprite.y - e.sprite.height / 2
    if (e.burn) {
      b.sprite.visible = true
    } else {
      b.sprite.visible = false
    }
  },
})

const renderJump = () => ({
  jumping: false,
  init: (b, e) => {
    b.originalTextures = e.sprite.textures
    b.jumpSprite = e.sprite.texture[0]
  },
  run: (b, e) => {
    if (!e.onGround && !b.jumping) {
      b.jumping = true
      e.sprite.textures = [Game.getTexture('lizard1')]
    } else if (e.onGround && b.jumping){
      b.jumping = false
      e.sprite.textures = ['lizard1', 'lizard2'].map(Game.getTexture)
      e.sprite.play()
    }
    // console.log('b.jumping', b.jumping)
    // console.log('e.onGround', e.onGrou nd)
  },
})

const useWalking = (e, walkingFrames) => {
  e.sprite.textures = walkingFrames.map(Game.getTexture)
  e.sprite.play()
}

const renderWalking = (walkingFrames) => ({
  walkingLeft: false,
  walkingRight: false,
  init: (b, e) => {
    b.originalTextures = e.sprite.textures
  },
  run: (b, e) => {
    if (e.walking && !b.walkingLeft && !b.walkingRight) {
      if (e.walking.left && !b.walkingLeft) {
        useWalking(e, walkingFrames)
        b.walkingRight = false
        b.walkingLeft = true
      } else if (e.walking.right && !b.walkingRight) {
        useWalking(e, walkingFrames)
        Util.flipSprite(e.sprite)
        b.walkingRight = true
        b.walkingLeft = false
      }

    } else if (!e.walking && (b.walkingLeft || b.walkingRight)) {
      e.sprite.textures = b.originalTextures
      e.sprite.anchor.x = 0.5
      e.sprite.play()
      b.walkingLeft = false
      b.walkingRight = false
    }
  },
})

