import { useState, useCallback } from 'react'
import { RuleSet, Rule } from '../types'

interface ValidationResult {
  rule: Rule
  isValid: boolean
}

export const usePasswordValidation = (ruleSet: RuleSet) => {
  const [inputValue, setInputValue] = useState('')
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([])

  const validate = useCallback(
    (password: string) => {
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
