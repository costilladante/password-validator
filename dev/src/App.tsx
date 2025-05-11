import PasswordValidator from '../../src/components/PasswordValidator/PasswordValidator'
import { defaultRules } from '../../src/rules'
import validIcon from '../../public/valid.svg'
import invalidIcon from '../../public/invalid.svg'

const App = () => (
  <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' }}>
    <h1>Password Validator Dev Environment</h1>

    <div style={{ marginBottom: '2rem' }}>
      <h2>Basic Usage</h2>
      <PasswordValidator ruleSet={defaultRules} />
    </div>

    <div style={{ marginBottom: '2rem' }}>
      <h2>Custom Indicators</h2>
      <PasswordValidator
        ruleSet={defaultRules}
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
        className="custom-container"
        inputClassName="custom-input"
        indicatorClassName="custom-indicator"
      />
    </div>
  </div>
)

export default App
