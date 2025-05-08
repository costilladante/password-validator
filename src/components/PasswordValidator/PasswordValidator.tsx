import { useState } from 'react'
import styles from './PasswordValidator.module.scss'
import { RuleSet } from '../../types/types'

interface PasswordValidatorProps {
  ruleSet: RuleSet
}

const PasswordValidator = ({ ruleSet }: PasswordValidatorProps) => {
  const [value, setValue] = useState('')
  return (
    <div className={styles['password-validator']}>
      <input placeholder="set password" value={value} onChange={(e) => setValue(e.target.value)} />
      {ruleSet.rules.map((rule) => (
        <div key={rule.name}>
          <span>{rule.message}</span>
          <span>{rule.validate(value) ? '❌' : '✅'}</span>
        </div>
      ))}
    </div>
  )
}

export default PasswordValidator
