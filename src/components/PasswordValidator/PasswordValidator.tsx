import clsx from 'clsx'
import { DEFAULT_INDICATORS } from '@/constants'
import { defaultRules } from '@/rules'
import { RuleSet } from '@/types'
import { usePasswordValidation } from '@/hooks'
import { ValidationResult } from '@/hooks/usePasswordValidation'

import styles from './PasswordValidator.module.scss'

interface PasswordValidatorProps {
  ruleSet?: RuleSet
  showToggle?: boolean
  indicators?: {
    valid?: React.ReactNode
    invalid?: React.ReactNode
  }

  // Callbacks
  onValidationChange?: (isValid: boolean, results: ValidationResult[]) => void
  onValueChange?: (value: string) => void

  // ClassName props for customization
  className?: string
  inputClassName?: string
  indicatorClassName?: string
}

const BASE_CLASS = 'password-validator'

const PasswordValidator = ({
  ruleSet = defaultRules,
  showToggle = true,
  indicators = DEFAULT_INDICATORS,
  onValidationChange,
  onValueChange,
  className,
  inputClassName,
  indicatorClassName,
}: PasswordValidatorProps) => {
  const {
    inputValue,
    validationResults,
    isPasswordVisible,
    hasInvalidRules,
    changeInputChange,
    togglePasswordVisibility,
  } = usePasswordValidation(ruleSet, onValidationChange, onValueChange)

  const passwordInputId = 'password-input'
  const passwordValidationListId = 'password-validation-list'
  const toggleButtonId = 'password-toggle'

  return (
    <div className={clsx(styles[`${BASE_CLASS}-container`], className)} role="group">
      <div className={styles[`${BASE_CLASS}-input-wrapper`]}>
        <input
          id={passwordInputId}
          className={clsx(styles[`${BASE_CLASS}-input`], inputClassName)}
          placeholder="Enter Password"
          type={isPasswordVisible ? 'text' : 'password'}
          value={inputValue}
          onChange={(e) => changeInputChange(e.target.value)}
          tabIndex={0}
          aria-label="Enter Password"
          aria-describedby={inputValue ? passwordValidationListId : undefined}
          aria-invalid={hasInvalidRules}
          aria-required="true"
        />
        {showToggle && (
          <button
            id={toggleButtonId}
            type="button"
            className={styles[`${BASE_CLASS}-toggle`]}
            onClick={togglePasswordVisibility}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isPasswordVisible}
          >
            {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>
      {/* Live region to announce the rules */}
      <div
        id="password-rules"
        className={styles[`${BASE_CLASS}-rules`]}
        role="region"
        aria-live="polite"
        aria-relevant="additions removals"
      >
        {inputValue && (
          <ul
            id={passwordValidationListId}
            className={styles[`${BASE_CLASS}-list`]}
            aria-label="Password requirements"
          >
            {validationResults.map(({ rule, isValid }, index) => (
              <li
                id={`rule-${index}`}
                key={rule.name} // * IDEA: Use rule.id as key
                className={clsx(
                  styles['password-validator-list-item'],
                  {
                    [styles['is-valid']]: isValid,
                    [styles['is-invalid']]: !isValid,
                  },
                  indicatorClassName,
                )}
                aria-label={`${isValid ? 'Valid' : 'Invalid'}`}
              >
                <span aria-hidden="true" role="img" aria-label={isValid ? 'Valid' : 'Invalid'}>
                  {isValid ? indicators.valid : indicators.invalid}
                </span>
                <span className={styles[`${BASE_CLASS}-list-item-message`]}>{rule.message}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PasswordValidator
