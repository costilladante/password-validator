import { useState, useCallback } from 'react'
import { RuleSet, Rule } from '../types'

interface ValidationResult {
  rule: Rule
  isValid: boolean
}

export const usePasswordValidation = (ruleSet: RuleSet) => {
  const [inputValue, setInputValue] = useState('')
  const [validationResults, setValidationResults] = useState<ValidationResult[]>(
    ruleSet.rules.map((rule) => ({ rule, isValid: false })),
  )

  const validate = useCallback(
    (password: string) => {
      if (password.length === 0) {
        setValidationResults(ruleSet.rules.map((rule) => ({ rule, isValid: false })))
        return false
      }
      const results = ruleSet.rules.map((rule) => ({
        rule,
        isValid: rule.validate(password) === null,
      }))
      setValidationResults(results)
      return results.every((result) => result.isValid)
    },
    [ruleSet],
  )
  const changeInputChange = useCallback(
    (newValue: string) => {
      setInputValue(newValue)
      validate(newValue)
    },
    [validate],
  )

  return {
    inputValue,
    validationResults,
    changeInputChange,
  }
}
