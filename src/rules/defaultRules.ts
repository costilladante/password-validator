import { FunctionRule, RegExpRule, RuleSet } from '../types/types'

/**
    Check if the password has not consecutive characters

    @param password - The password to check
    @returns `true` if the password has not consecutive characters, `false` otherwise
*/
const hasNotConsecutiveCharacters = (password: string) => {
  if (!password || password.length < 3) return false
  const consecutiveCharacters = /(.)\1\1/
  return !consecutiveCharacters.test(password)
}

/**
 * Here the default rules are defined
 */
export const defaultRules: RuleSet = new RuleSet([
  new RegExpRule(
    'specialChar',
    'Must include at least one special character (!@#$%^&*)',
    /[!@#$%^&*]/,
  ),
  new RegExpRule('number', 'Must include at least one number', /[0-9]/),
  new RegExpRule('uppercase', 'Must include at least one uppercase letter', /[A-Z]/),
  new FunctionRule(
    'noConsecutive',
    'Must not have three or more consecutive identical characters',
    hasNotConsecutiveCharacters,
  ),
])
