import { Rule } from '../types/types'

/**
    Check if the password has not consecutive characters

    @param {string} password - The password to check
    @returns {boolean} - True if the password has not consecutive characters, false otherwise
*/
const hasNotConsecutiveCharacters = (password: string) => {
  const consecutiveCharacters = /(.)\1\1/
  return !consecutiveCharacters.test(password)
}

/**
 * Here we define the default rules
 */
export const defaultRules: Rule[] = [
  {
    name: 'specialChar',
    message: 'Must include at least one special character (!@#$%^&*)',
    validate: /[!@#$%^&*]/,
  },
  {
    name: 'number',
    message: 'Must include at least one number',
    validate: /[0-9]/,
  },
  {
    name: 'uppercase',
    message: 'Must include at least one uppercase letter',
    validate: /[A-Z]/,
  },
  {
    name: 'noConsecutive',
    message: 'Must not have three or more consecutive identical characters',
    validate: hasNotConsecutiveCharacters,
  },
]
