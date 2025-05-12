import PasswordValidator from '../../src/components/PasswordValidator/PasswordValidator'
import { defaultRules } from '../../src/rules'
import validIcon from '../../public/valid.svg'
import invalidIcon from '../../public/invalid.svg'
import { ValidationResult } from '@/hooks/usePasswordValidation'

const App = () => {
  const handlePasswordValidation = (isValid: boolean, results: ValidationResult[]) => {
    // eslint-disable-next-line no-console
    console.log('🔬Is valid:', isValid)
    // eslint-disable-next-line no-console
    console.log('🔎Validation results:', results)
  }

  const handlePasswordChange = (value: string) => {
    // eslint-disable-next-line no-console
    console.log('🎯 Password changed:', value)
  }

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Password Validator Dev Environment</h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Basic Usage</h2>
        <PasswordValidator
          onValidationChange={handlePasswordValidation}
          onValueChange={handlePasswordChange}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Custom Indicators</h2>
        <PasswordValidator
          ruleSet={defaultRules}
          onValidationChange={handlePasswordValidation}
          onValueChange={handlePasswordChange}
          indicators={{
            valid: (
              <img
                src={validIcon}
                alt="Valid"
                style={{
                  width: '1em',
                  height: '1em',
                }}
              />
            ),
            invalid: (
              <img
                src={invalidIcon}
                alt="Invalid"
                style={{ width: '1em', height: '1em', color: '#ef4444' }}
              />
            ),
          }}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Custom Styling</h2>
        <PasswordValidator
          ruleSet={defaultRules}
          onValidationChange={handlePasswordValidation}
          onValueChange={handlePasswordChange}
          className="custom-container"
          inputClassName="custom-input"
          indicatorClassName="custom-indicator"
        />
      </div>
    </div>
  )
}

export default App
