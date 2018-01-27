import { Entity } from 'l1'
import { small } from './util/text'

const LOBBY_START_X = 100
const LOBBY_Y = 10
const LOBBY_OFFSET_X = 550
const LOBBY_OFFSET_Y = 400

export default () => {
  createLobbyContainer(1, LOBBY_START_X, LOBBY_Y)
  createLobbyContainer(2, LOBBY_START_X + LOBBY_OFFSET_X, LOBBY_Y)
  createLobbyContainer(3, LOBBY_START_X, LOBBY_Y + LOBBY_OFFSET_Y)
  createLobbyContainer(4, LOBBY_START_X + LOBBY_OFFSET_X, LOBBY_Y + LOBBY_OFFSET_Y)
}

const createLobbyContainer = (index, x, y) => {
  const entity = Entity.create(`lobby-container-${index}`)
  const sprite = Entity.addSprite(entity, 'lobby-container')
  sprite.scale.set(8)
  sprite.position.x = x
  sprite.position.y = y

  const aButton = Entity.create(`a-button${index}`)
  const aButtonSprite = Entity.addSprite(aButton, 'a-button')
  aButtonSprite.position.x = x + 50
  aButtonSprite.position.y = y + 150
  aButtonSprite.scale.set(4)

  const pressToJoin = Entity.create(`pressToJoinText${index}`)
  const pressToJoinText = Entity.addText(pressToJoin, 'Press A to Join ', small('gray'), { zIndex: 10 })
  pressToJoinText.position.x = x + 170
  pressToJoinText.position.y = y + 170
}