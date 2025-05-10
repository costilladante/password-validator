import { describe, it, expect } from 'vitest'
import { defaultRules } from '../defaultRules'

describe('RuleSet', () => {
  describe('validate', () => {
    it('returns empty array for valid passwords', () => {
      const validPasswords = ['Test123!', 'Complex1@', 'Secure2#']

      validPasswords.forEach((password) => {
        expect(defaultRules.validate(password)).toEqual([])
      })
    })

    it('returns error messages for passwords missing special characters', () => {
      const invalidPasswords = ['Test123', 'Complex1', 'Secure2']

      invalidPasswords.forEach((password) => {
        expect(defaultRules.validate(password)).toContain(
          'Must include at least one special character (!@#$%^&*)',
        )
      })
    })

    it('returns error messages for passwords missing numbers', () => {
      const invalidPasswords = ['Test!@#', 'Complex@#', 'Secure#$']

      invalidPasswords.forEach((password) => {
        expect(defaultRules.validate(password)).toContain('Must include at least one number')
      })
    })

    it('returns error messages for passwords missing uppercase letters', () => {
      const invalidPasswords = ['test123!', 'complex1@', 'secure2#']

      invalidPasswords.forEach((password) => {
        expect(defaultRules.validate(password)).toContain(
          'Must include at least one uppercase letter',
        )
      })
    })

    it('returns error messages for passwords with consecutive characters', () => {
      const invalidPasswords = ['Test111!', 'Complex222@', 'Secure333#']

      invalidPasswords.forEach((password) => {
        expect(defaultRules.validate(password)).toContain(
          'Must not have three or more consecutive identical characters',
        )
      })
    })
  })
})
