// This is the validator that checks if the password is valid
// It can check using the default rules or using a custom set of rules

import { Rule } from './types/types'

/**
    Check if the password is valid, given a set of rules

    @param {string} password - The password to check
    @param {Rule[]} rules - The rules to check the password against
    @returns {string | null} - The error message if the password is invalid, null otherwise
*/
export const validatePassword = (password: string, rules: Rule[]) => {
  if (rules.length === 0) {
    return null
  }

  let message
  rules.find((rule) => {
    if (rule.validate instanceof RegExp) {
      if (!rule.validate.test(password)) {
        message = rule.message
      }
    }
    // Is a function
    if (typeof rule.validate === 'function') {
      if (!rule.validate(password)) {
        message = rule.message
      }
    }
  })

  return message || null
}
