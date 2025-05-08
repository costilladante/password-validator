import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PasswordValidator from './PasswordValidator'
import { defaultRules } from '../../rules/defaultRules'

describe('PasswordValidator', () => {
  // Basic Rendering Tests
  describe('rendering', () => {
    it('renders password input field', () => {
      render(<PasswordValidator ruleSet={defaultRules} />)
      expect(screen.getByPlaceholderText(/Enter Password/i)).toBeInTheDocument()
    })

    it('renders all rule messages', () => {
      render(<PasswordValidator ruleSet={defaultRules} />)
      defaultRules.rules.forEach((rule) => {
        expect(screen.getByText(rule.message)).toBeInTheDocument()
      })
    })
  })

  // User Interaction Tests
  describe('user interactions', () => {
    it('updates input value on user type', async () => {
      const user = userEvent.setup()
      render(<PasswordValidator ruleSet={defaultRules} />)
      const input = screen.getByPlaceholderText(/Enter Password/i)

      await user.type(input, 'Test123!')
      expect(input).toHaveValue('Test123!')
    })

    it('updates rule validation status on input change', async () => {
      const user = userEvent.setup()
      render(<PasswordValidator ruleSet={defaultRules} />)
      const input = screen.getByPlaceholderText(/Enter Password/i)

      // Initial state - all rules should fail
      defaultRules.rules.forEach((rule) => {
        expect(screen.getByText(rule.message).previousSibling).toHaveTextContent('❌')
      })

      // Type a valid password
      await user.type(input, 'Test123!')

      // All rules should pass
      defaultRules.rules.forEach((rule) => {
        expect(screen.getByText(rule.message).previousSibling).toHaveTextContent('✅')
      })
    })
  })

  // * Idea: Test custom indicators
})
