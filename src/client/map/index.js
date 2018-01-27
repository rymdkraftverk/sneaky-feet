import _ from 'lodash'

import block from './block'
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
    .filter(([cell]) => cell === '█')
    .map(([_cell, b]) => b)
}

const init = () => {
  resoled_level(dungeon)
    .forEach((b, i) => { block(i, b) })
}

export default init
