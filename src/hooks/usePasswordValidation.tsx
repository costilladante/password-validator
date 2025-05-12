import { useState, useCallback, useEffect } from 'react'
import { RuleSet, Rule } from '@/types'

export interface ValidationResult {
  rule: Rule
  isValid: boolean
}

export interface PasswordValidationState {
  inputValue: string
  validationResults: ValidationResult[]
  isPasswordVisible: boolean
  hasInvalidRules: boolean
}

export const usePasswordValidation = (
  ruleSet: RuleSet,
  onValidationChange?: (isValid: boolean, results: ValidationResult[]) => void,
  onValueChange?: (value: string) => void,
) => {
  const [inputValue, setInputValue] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(true)
  const [validationResults, setValidationResults] = useState<ValidationResult[]>(
    ruleSet.rules.map((rule) => ({ rule, isValid: false })),
  )

  const hasInvalidRules = validationResults.some((result) => !result.isValid)

  // Callbacks on mount (just for initial state)
  useEffect(() => {
    onValidationChange?.(false, validationResults)
    onValueChange?.('')
  }, [])

  const validate = useCallback(
    (password: string) => {
      if (password.length === 0) {
        const results = ruleSet.rules.map((rule) => ({ rule, isValid: false }))
        setValidationResults(results)
        onValidationChange?.(false, results)
        return false
      }
      const results = ruleSet.rules.map((rule) => ({
        rule,
        isValid: rule.validate(password) === null,
      }))
      setValidationResults(results)
      const isValid = results.every((result) => result.isValid)
      onValidationChange?.(isValid, results)
      return results.every((result) => result.isValid)
    },
    [ruleSet, onValidationChange],
  )
  const changeInputChange = useCallback(
    (newValue: string) => {
      setInputValue(newValue)
      validate(newValue)
      onValueChange?.(newValue)
    },
    [validate, onValueChange],
  )

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev)
  }, [])

  return {
    inputValue,
    validationResults,
    changeInputChange,
    isPasswordVisible,
    hasInvalidRules,
    togglePasswordVisibility,
  }
}
