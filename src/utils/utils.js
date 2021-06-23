export const getLevel = (xp) => {
  return Math.floor(xp / 400) + 1
}

export const getXpBarPercentage = (xp) => {
  return (xp % 400) / 400
}
