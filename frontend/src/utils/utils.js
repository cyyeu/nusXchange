import validator from 'validator'
import { Basic, Silver, Gold, Diamond } from '../components/Tiers'
import React from 'react'

// gamification constants
const xpPerLevel = 200 // level up every 200xp
const getTier = (level) => {
  // Basic tier (Level 1-10)
  // Silver tier (Level 11-30)
  // Gold Tier (Level 31 - 70)
  // Diamond tier (> Level 71)
  if (level > 70) {
    return Diamond
  }
  if (level > 30) {
    return Gold
  }
  if (level > 10) {
    return Silver
  }

  return Basic
}
const getLevel = (xp) => {
  return Math.floor(xp / xpPerLevel) + 1
}

export const getLevelAndTier = (xp) => {
  const level = getLevel(xp)
  const Tier = getTier(level)
  return [level, Tier]
}

export const getXpBarPercentage = (xp) => {
  return (xp % xpPerLevel) / xpPerLevel
}

export function validateMod(mod, setter) {
  let modRe = /^[a-zA-Z]{2,4}[1-4]{1}[0-9]{3}[a-zA-Z]?$/
  if (modRe.test(mod)) {
    setter((prevErrors) => {
      return { ...prevErrors, mod_code: '' }
    })
  } else {
    setter((prevErrors) => {
      return { ...prevErrors, mod_code: 'Invalid module code.' }
    })
  }
}

export function validatePrice(price, setter) {
  if (validator.isNumeric(price)) {
    setter((prevErrors) => {
      return { ...prevErrors, price: '' }
    })
  } else {
    setter((prevErrors) => {
      return { ...prevErrors, price: 'Not a valid price.' }
    })
  }
}
