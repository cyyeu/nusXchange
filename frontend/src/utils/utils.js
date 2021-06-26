export const getLevel = (xp) => {
  return Math.floor(xp / 200) + 1
}

export const getXpBarPercentage = (xp) => {
  return (xp % 200) / 200
}
