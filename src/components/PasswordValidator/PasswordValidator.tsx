import clsx from 'clsx'
import styles from './PasswordValidator.module.scss'
import { RuleSet } from '../../types/types'
import { DEFAULT_INDICATORS } from '@/constants'
import { usePasswordValidation } from '@/hooks'

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
  ruleSet,
  indicators = DEFAULT_INDICATORS,
  className,
  inputClassName,
  indicatorsClassName,
  indicatorItemClassName,
}: PasswordValidatorProps) => {
  const { inputValue, validationResults, changeInputChange } = usePasswordValidation(ruleSet)
  return (
    <div className={clsx(styles['password-validator-container'], className)}>
      <div className={clsx(styles['password-validator-input'], inputClassName)}>
        <input
          placeholder="Enter Password"
          value={inputValue}
          onChange={(e) => changeInputChange(e.target.value)}
        />
      </div>
      <div className={clsx(styles['password-validator-indicators'], indicatorsClassName)}>
        {validationResults.map(({ rule, isValid }) => (
          <div
            key={rule.name}
            className={clsx(
              styles['password-validator-indicator-item'],
              {
                [styles['is-valid']]: isValid,
                [styles['is-invalid']]: !isValid,
              },
              indicatorItemClassName,
            )}
          >
            <span>{isValid ? indicators.valid : indicators.invalid}</span>
            <span>{rule.message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PasswordValidator
