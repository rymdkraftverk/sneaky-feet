import _ from 'lodash'

import block from './block'
import wall_block from './wall_block'
import floor_block from './floor_block'
import dungeon from './dungeon'

const block_offset = 30
const block_position = (x, y) => (
  {
    x: x * 45 + block_offset,
    y: y * 20 + 20,
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

const init = () => {
  resoled_level(dungeon).forEach(([cell, position], i) => {
    const block_placers = {
      '█': block,
      '■': wall_block,
      '▬': floor_block,
    }

    block_placers[cell](i, position)
  })
}

export default init
