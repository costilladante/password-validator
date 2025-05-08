import { useState } from 'react'
import styles from './PasswordValidator.module.scss'
import { RuleSet } from '../../types/types'

const DEFAULT_INDICATORS = {
  valid: '✅',
  invalid: '❌',
}

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
  const [value, setValue] = useState('')
  return (
    <div className={`${styles['password-validator-container']} ${className || ''}`}>
      <div className={`${styles['password-validator-input']} ${inputClassName || ''}`}>
        <input
          placeholder="Enter Password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className={`${styles['password-validator-indicators']} ${indicatorsClassName || ''}`}>
        {ruleSet.rules.map((rule) => (
          <div
            key={rule.name}
            className={`${styles['password-validator-indicator-item']} ${indicatorItemClassName || ''}`}
          >
            <span>{rule.validate(value) ? indicators.invalid : indicators.valid}</span>
            <span>{rule.message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PasswordValidator
