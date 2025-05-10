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
  indicatorsClassName?: string
  indicatorItemClassName?: string
}

const PasswordValidator = ({
  ruleSet = defaultRules,
  indicators = DEFAULT_INDICATORS,
  className,
  inputClassName,
  indicatorsClassName,
  indicatorItemClassName,
}: PasswordValidatorProps) => {
  const { inputValue, validationResults, changeInputChange } = usePasswordValidation(ruleSet)

  // Check if any rules are invalid
  const hasInvalidRules = validationResults.some((result) => !result.isValid)

  const passwordInputId = 'password-input'
  const passwordValidationListId = 'password-validation-list'

  return (
    <div
      className={clsx(styles['password-validator-container'], className)}
      aria-label="Password validator"
    >
      <div className={clsx(styles['password-validator-input'], inputClassName)}>
        <input
          id={passwordInputId}
          placeholder="Enter Password"
          value={inputValue}
          onChange={(e) => changeInputChange(e.target.value)}
          tabIndex={0}
          aria-label="Enter Password"
          aria-describedby={inputValue ? passwordValidationListId : undefined}
          aria-invalid={hasInvalidRules}
        />
      </div>

      {/* Live region to announce the rules */}
      <div
        id="password-rules"
        className="password-validator-rules"
        role="region"
        aria-live="polite"
      >
        {inputValue && (
          <ul
            id={passwordValidationListId}
            className={clsx(styles['password-validator-list'], indicatorsClassName)}
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
                  indicatorItemClassName,
                )}
                // ? Alternative aria-label: it was too long to narrate.
                // aria-label={`${rule.message} - ${isValid ? 'Valid' : 'Invalid'}`}
                aria-label={`${isValid ? 'Valid' : 'Invalid'}`}
              >
                <span aria-hidden="true" role="img" aria-label={isValid ? 'Valid' : 'Invalid'}>
                  {isValid ? indicators.valid : indicators.invalid}
                </span>
                <span>{rule.message}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PasswordValidator
