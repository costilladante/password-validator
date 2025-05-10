import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordValidator } from '@components/PasswordValidator'
import { defaultRules } from '@/rules'

describe('PasswordValidator', () => {
  // Basic Rendering Tests
  describe('rendering', () => {
    it('renders password input field', () => {
      render(<PasswordValidator ruleSet={defaultRules} />)
      expect(screen.getByPlaceholderText(/Enter Password/i)).toBeInTheDocument()
    })

    // Rules shouldn't be visible if the password is empty
    it('does not render rules if password is empty', () => {
      render(<PasswordValidator ruleSet={defaultRules} />)
      defaultRules.rules.forEach((rule) => {
        expect(screen.queryByText(rule.message)).not.toBeInTheDocument()
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
