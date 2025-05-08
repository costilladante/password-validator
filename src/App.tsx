import './App.scss'
import PasswordValidator from './components/PasswordValidator/PasswordValidator'

import { defaultRules } from './rules/defaultRules'

const App = () => (
  <div>
    <h1>Password Validator Component</h1>
    <PasswordValidator ruleSet={defaultRules} />
  </div>
)

export default App
