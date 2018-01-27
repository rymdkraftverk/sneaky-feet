import { Entity, Sound, Gamepad } from 'l1'
import _ from 'lodash'
import { small } from '../util/text'
import { buttons } from '../util/gamepad'

const LOBBY_START_X = 100
const LOBBY_Y = 10
const LOBBY_OFFSET_X = 550
const LOBBY_OFFSET_Y = 400

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

  Sound
    .getSound('./sound/lobby_music.wav', { volue: 0.8, loop: true })
    .play()
}

const createLobbyContainer = (index, x, y) => {
  const entity = Entity.create(`lobby-container-${index}`)
  const sprite = Entity.addSprite(entity, 'lobby-container')
  sprite.scale.set(8)
  sprite.position.x = x
  sprite.position.y = y

  const aButton = Entity.create(`a-button${index}`)
  const aButtonSprite = Entity.addSprite(aButton, 'a-button', { zIndex: 10} )
  aButtonSprite.position.x = x + 50
  aButtonSprite.position.y = y + 150
  aButtonSprite.scale.set(4)

  const pressToJoin = Entity.create(`pressToJoinText${index}`)
  const pressToJoinText = Entity.addText(pressToJoin, 'Press A to Join ', small('gray'), { zIndex: 10 })
  pressToJoinText.position.x = x + 170
  pressToJoinText.position.y = y + 170
}

const checkPlayerJoined = (id) => {
  if (!playersJoined[id] && Gamepad.isPressed(id, buttons.a)) {
    playersJoined[id] = true;
    
    [Entity.get(`a-button${id}`), Entity.get(`pressToJoinText${id}`)].forEach(Entity.destroy)

    console.log('player joined: ', id)
  }
}

const listeningForInput = () => ({
  init: (b, e) => {

  },
  run: (b, e) => {
    _.times(4, checkPlayerJoined)
  },
})
