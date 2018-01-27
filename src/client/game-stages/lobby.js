import { Entity, Sound, Gamepad, Key } from 'l1'
import _ from 'lodash'
import { flow, keys, values, pick } from 'lodash/fp'
import { small, big } from '../util/text'
import { buttons } from '../util/gamepad'
import { player_templates } from '../spawn_players'
import battle from './battle'
import { playerIds } from '../spawn_players'
import { indexToId } from '../util/players'

const LOBBY_START_X = 100
const LOBBY_Y = 10
const LOBBY_OFFSET_X = 550
const LOBBY_OFFSET_Y = 400

let lobbyMusic

const playersJoined = {
  0: null,
  1: null,
  2: null,
  3: null,
}

export default () => {
  createLobbyContainer(0, LOBBY_START_X, LOBBY_Y)
  createLobbyContainer(1, LOBBY_START_X + LOBBY_OFFSET_X, LOBBY_Y)
  createLobbyContainer(2, LOBBY_START_X, LOBBY_Y + LOBBY_OFFSET_Y)
  createLobbyContainer(3, LOBBY_START_X + LOBBY_OFFSET_X, LOBBY_Y + LOBBY_OFFSET_Y)
  const lobbyHandler = Entity.create('lobbyHandler')
  lobbyHandler.behaviors.listeningForInput = listeningForInput()

  lobbyMusic = Sound.getSound('./sound/lobby_music.wav', { volume: 1, loop: true })
  lobbyMusic.play()
}

const createLobbyContainer = (index, x, y) => {
  const entity = Entity.create(`lobby-container-${index}`)
  const sprite = Entity.addSprite(entity, 'lobby-container')
  sprite.scale.set(8)
  sprite.position.x = x
  sprite.position.y = y

  const aButton = Entity.create(`a-button${index}`)
  const aButtonSprite = Entity.addSprite(aButton, 'a-button', { zIndex: 10} )
  aButtonSprite.position.x = x + 30
  aButtonSprite.position.y = y + 150
  aButtonSprite.scale.set(4)

  const pressToJoin = Entity.create(`pressToJoinText${index}`)
  const pressToJoinText = Entity.addText(pressToJoin, 'Press A to Join ', small('gray'), { zIndex: 10 })
  pressToJoinText.position.x = x + 120
  pressToJoinText.position.y = y + 170
}

const playerJoined = (index, x, y) => {
  const startButton = Entity.create(`start-button${index}`)
  const startButtonSprite = Entity.addSprite(startButton, 'start-button', { zIndex: 10} )
  startButtonSprite.position.x = x
  startButtonSprite.position.y = y
  startButtonSprite.scale.set(3)

  const pressToReady = Entity.create(`pressToReadyText${index}`)
  const pressToReadyText = Entity.addText(pressToReady, 'Ready? Press Start!', small('gray'), { zIndex: 10 })
  pressToReadyText.position.x = x + 80
  pressToReadyText.position.y = y + 20

  const playerAvatar = Entity.create(`playerAvatar${index}`)
  const playerAvatarSprite = Entity.addAnimation(playerAvatar, player_templates[index].animation, 0.05, { zIndex: 10 })
  playerAvatarSprite.position.x = x + 180
  playerAvatarSprite.position.y = y + 80
  playerAvatarSprite.scale.set(8)
}

const playerReady = (index, x, y) => {
  const ready = Entity.create(`ready${index}`)
  const readyText = Entity.addText(ready, 'Ready!', big('gray'), { zIndex: 10 })
  readyText.position.x = x + 100
  readyText.position.y = y - 50
  Sound.getSound('./sound/ready.wav', { volume: 0.4 }).play()
}

const checkPlayerJoined = (id) => {
  if (!playersJoined[id] && Gamepad.isPressed(id, buttons.a)) {
    
    const aButton = Entity.get(`a-button${id}`)
    const pressToJoin = Entity.get(`pressToJoinText${id}`)
    
    playerJoined(id, aButton.sprite.position.x, aButton.sprite.position.y)
    
    ;[aButton, pressToJoin].forEach(Entity.destroy)
    
    playersJoined[id] = {
      joined: true,
      ready: false,
    }
  }
}

const checkIsReady = (id) => {
  if (
    playersJoined[id] && 
    !playersJoined[id].ready && 
    Gamepad.isPressed(id, buttons.start)
  ) {
    const startButton = Entity.get(`start-button${id}`)
    const pressToReady = Entity.get(`pressToReadyText${id}`)
    
    playerReady(id, startButton.sprite.position.x, startButton.sprite.position.y)
    
    ;[startButton, pressToReady].forEach(Entity.destroy)
    playersJoined[id] = {
      ...playersJoined[id],
      ready: true,
    }
  }
}

const checkContinue = () => {
  const playersThatHaveJoined = _.filter(playersJoined, _.identity)
  if (playersThatHaveJoined.length < 3) {
    return;
  }
  if (!_.every(playersThatHaveJoined, (player) => player && player.ready)) {
    return;
  }

  const keys = _.keys(playersThatHaveJoined)
  const ids = _.pick(indexToId, keys)
  goToBattle(ids)
}

const checkForceContinue = () => {
  if (Key.isDown('space')) {
    goToBattle(playerIds)
  }
}

const goToBattle = (playerIds) => {
  lobbyMusic.pause()
  battle(_.values(playerIds))
}

const listeningForInput = () => ({
  run: (b, e) => {
    checkForceContinue()
    _.times(4, checkIsReady)
    _.times(4, checkPlayerJoined)
    checkContinue()
  },
})
