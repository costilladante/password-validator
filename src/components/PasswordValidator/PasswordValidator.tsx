import { useState } from 'react'
import { validatePassword } from '../../validator'
import { defaultRules } from '../../rules/defaultRules'
import styles from './PasswordValidator.module.scss'

const password = 'Test123'
const error = validatePassword(password, defaultRules)

if (error) {
  // eslint-disable-next-line no-console
  console.log('Password invalid:', error)
} else {
  // eslint-disable-next-line no-console
  console.log('Password is valid!')
}

const PasswordValidator = () => {
  const [value, setValue] = useState('')
  return (
    <div className={styles['password-validator']}>
      <input placeholder="set password" value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}

export default PasswordValidator
