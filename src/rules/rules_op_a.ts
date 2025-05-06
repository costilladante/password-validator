// These are the default rules that the password must follow

/**  
    Check if the password has one or more of these especial characters: !@#$%^&*

    @param {string} password - The password to check
    @returns {boolean} - True if the password has one or more of the special characters, false otherwise
*/
export const hasSpecialCharacters = (password: string) => {
  const specialCharacters = /[!@#$%^&*]/
  return specialCharacters.test(password)
}

/**
    Check if the password has one or more numbers

    @param {string} password - The password to check
    @returns {boolean} - True if the password has one or more numbers, false otherwise
*/
export const hasNumber = (password: string) => {
  const numbers = /[0-9]/
  return numbers.test(password)
}

/**
    Check if the password has one or more uppercase letters

    @param {string} password - The password to check
    @returns {boolean} - True if the password has one or more uppercase letters, false otherwise
*/
export const hasUpperCase = (password: string) => {
  const upperCase = /[A-Z]/
  return upperCase.test(password)
}

/**
    Check if the password has not consecutive characters

    @param {string} password - The password to check
    @returns {boolean} - True if the password has not consecutive characters, false otherwise
*/
export const hasNotConsecutiveCharacters = (password: string) => {
  const consecutiveCharacters = /(.)\1\1/
  return !consecutiveCharacters.test(password)
}
