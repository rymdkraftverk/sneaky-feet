import _ from 'lodash'

import background from './background'
import block from './block'
import wall_block from './wall_block'
import floor_block from './floor_block'
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
    }

    block_placers[cell](i, position)
  })
}

export default () => {
  background()
  statics()
}
