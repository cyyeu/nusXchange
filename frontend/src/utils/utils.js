import validator from 'validator'

export const getLevel = (xp) => {
  return Math.floor(xp / 200) + 1
}

export const getXpBarPercentage = (xp) => {
  return (xp % 200) / 200
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

