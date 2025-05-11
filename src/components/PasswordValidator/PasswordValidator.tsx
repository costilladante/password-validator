import clsx from 'clsx'
import styles from './PasswordValidator.module.scss'
import { RuleSet } from '../../types/ruleTypes'
import { DEFAULT_INDICATORS } from '@/constants'
import { usePasswordValidation } from '@/hooks'
import { defaultRules } from '@/rules'

interface PasswordValidatorProps {
  ruleSet: RuleSet
  indicators?: {
    valid?: React.ReactNode
    invalid?: React.ReactNode
  }

  // ClassName props for customization
  className?: string
  inputClassName?: string
  indicatorClassName?: string
}

const BASE_CLASS = 'password-validator'

const PasswordValidator = ({
  ruleSet = defaultRules,
  indicators = DEFAULT_INDICATORS,
  className,
  inputClassName,
  indicatorClassName,
}: PasswordValidatorProps) => {
  const { inputValue, validationResults, changeInputChange } = usePasswordValidation(ruleSet)

  // Check if any rules are invalid
  const hasInvalidRules = validationResults.some((result) => !result.isValid)

  const passwordInputId = 'password-input'
  const passwordValidationListId = 'password-validation-list'

  return (
    <div
      className={clsx(styles[`${BASE_CLASS}-container`], className)}
      aria-label="Password validator"
    >
      <input
        id={passwordInputId}
        className={clsx(styles[`${BASE_CLASS}-input`], inputClassName)}
        placeholder="Enter Password"
        value={inputValue}
        onChange={(e) => changeInputChange(e.target.value)}
        tabIndex={0}
        aria-label="Enter Password"
        aria-describedby={inputValue ? passwordValidationListId : undefined}
        aria-invalid={hasInvalidRules}
      />

      {/* Live region to announce the rules */}
      <div
        id="password-rules"
        className={styles[`${BASE_CLASS}-rules`]}
        role="region"
        aria-live="polite"
      >
        {inputValue && (
          <ul id={passwordValidationListId} className={styles[`${BASE_CLASS}-list`]}>
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
