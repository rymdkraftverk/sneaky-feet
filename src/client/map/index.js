import _ from 'lodash'

import { Entity } from 'l1'

import background from './background'
import block from './block'
import wall_block from './wall_block'
import floor_block from './floor_block'
import ulti_door_block from './ulti_door_block'
import dungeon from './dungeon'

const block_position = (x, y) => (
  {
    x: x * 45 - 10,
    y: y * 20 - 0,
  }
)

const resoled_level = level => {
  return _.flatten(
    level.map(
      (row, y) => row
        .map((cell, x) => [cell, block_position(x, y)])
    )
  )
    .filter(([cell]) => cell != ' ')
}

const statics = () => {
  resoled_level(dungeon).forEach(([cell, position], i) => {
    const block_placers = {
      '█': block,
      '■': wall_block,
      '▬': floor_block,
      '▁': ulti_door_block,
    }

    block_placers[cell](i, position)
  })
}

export const open_ulti_door = () => {
  Entity.getByType('ulti_door_block').forEach(block => {
    block.open()
  })
}

export default () => {
  background()
  statics()
}
