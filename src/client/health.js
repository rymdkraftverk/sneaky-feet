const maxHp = 100

const initHealth = (onDeath, hp) => ({
  onDeath: onDeath,
  hp: hp === undefined
    ? maxHp
    : hp,
})

const updateHealth = (health, diff) => {
  const newHp = Math.min(health.hp + diff, maxHp)

  if(newHp <= 0) {
    health.onDeath(newHp)
  }

  return initHealth(health.onDeath, newHp)
}

export { initHealth, updateHealth }