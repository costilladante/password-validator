import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordValidator } from '@/components'
import { defaultRules } from '@/rules'

describe('PasswordValidator', () => {
  // Basic Rendering Tests
  describe('rendering', () => {
    it('renders password input field', () => {
      render(<PasswordValidator ruleSet={defaultRules} />)
      expect(screen.getByPlaceholderText(/Enter Password/i)).toBeInTheDocument()
    })

    it('does not render validation rules when input is empty', () => {
      render(<PasswordValidator ruleSet={defaultRules} />)
      expect(screen.queryByRole('password-validator-list')).not.toBeInTheDocument()
    })

    it('renders validation rules when input has value', async () => {
      const user = userEvent.setup()
      render(<PasswordValidator ruleSet={defaultRules} />)
      const input = screen.getByPlaceholderText(/Enter Password/i)

      await user.type(input, 'test')
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('applies custom class names', async () => {
      const user = userEvent.setup()

      const customClass = 'custom-class'
      const customInputClass = 'custom-input'
      const customIndicatorClass = 'custom-indicator'

      render(
        <PasswordValidator
          ruleSet={defaultRules}
          className={customClass}
          inputClassName={customInputClass}
          indicatorClassName={customIndicatorClass}
        />,
      )

      const input = screen.getByPlaceholderText(/Enter Password/i)
      await user.type(input, 'test')

      // Check container class
      const container = screen.getByRole('group')
      expect(container).toHaveClass(customClass)

      // Check input class
      expect(input).toHaveClass(customInputClass)

      // Check indicator classes
      const listItems = screen.getAllByRole('listitem')
      listItems.forEach((item) => {
        expect(item).toHaveClass(customIndicatorClass)
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

      await user.type(input, 'Test123!')
      const validationItems = screen.getAllByRole('listitem')
      expect(validationItems).toHaveLength(defaultRules.rules.length)
    })
  })

  // Accessibility Tests
  describe('accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<PasswordValidator ruleSet={defaultRules} />)
      const input = screen.getByPlaceholderText(/Enter Password/i)

      expect(input).toHaveAttribute('aria-label', 'Enter Password')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('has live region for validation rules', async () => {
      const user = userEvent.setup()
      render(<PasswordValidator ruleSet={defaultRules} />)
      const input = screen.getByPlaceholderText(/Enter Password/i)

      await user.type(input, 'test')
      const liveRegion = screen.getByRole('region')
      expect(liveRegion).toHaveAttribute('aria-live', 'polite')
    })

    it('has proper validation indicators', async () => {
      const user = userEvent.setup()
      render(<PasswordValidator ruleSet={defaultRules} />)
      const input = screen.getByPlaceholderText(/Enter Password/i)

      await user.type(input, 'test')
      const validationItems = screen.getAllByRole('listitem')
      validationItems.forEach((item) => {
        expect(item).toHaveAttribute('aria-label')
      })
    })
  })

  // Custom Indicators Tests
  describe('custom indicators', () => {
    it('renders custom indicators', async () => {
      const customIndicators = {
        valid: '✓',
        invalid: '✗',
      }
      const user = userEvent.setup()

      render(<PasswordValidator ruleSet={defaultRules} indicators={customIndicators} />)
      const input = screen.getByPlaceholderText(/Enter Password/i)
      await user.type(input, 'test')

      const validationItems = screen.getAllByRole('listitem')
      validationItems.forEach((item) => {
        const indicator = item.querySelector('[role="img"]')
        expect(indicator).toHaveAttribute('aria-label', expect.stringMatching(/Valid|Invalid/))
      })
    })
  })

  // Toggle Button and Validation List Tests
  describe('toggle button', () => {
    it('does not render the toggle button when showToggle is false', () => {
      render(<PasswordValidator ruleSet={defaultRules} showToggle={false} />)
      expect(
        screen.queryByRole('button', { name: /show password|hide password/i }),
      ).not.toBeInTheDocument()
    })

    it('renders the toggle button when showToggle is true', () => {
      render(<PasswordValidator ruleSet={defaultRules} showToggle={true} />)

      expect(
        screen.getByRole('button', { name: /show password|hide password/i }),
      ).toBeInTheDocument()
    })
  })

  it('sets the correct aria-label on the toggle button', async () => {
    const user = userEvent.setup()
    render(<PasswordValidator ruleSet={defaultRules} />)

    // Initially, password is shown, so label should be "Hide password"
    const toggleButton = screen.getByRole('button', { name: /hide password/i })
    expect(toggleButton).toHaveAttribute('aria-label', 'Hide password')

    // Click to hide password
    await user.click(toggleButton)
    // Now, password is hidden, so label should be "Show password"
    expect(toggleButton).toHaveAttribute('aria-label', 'Show password')
  })

  describe('validation list', () => {
    it('does not render the validation list when input is empty', () => {
      render(<PasswordValidator ruleSet={defaultRules} />)
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })

    it('renders the validation list when input has value', async () => {
      const user = userEvent.setup()
      render(<PasswordValidator ruleSet={defaultRules} />)
      const input = screen.getByPlaceholderText(/Enter Password/i)
      await user.type(input, 'test')
      expect(screen.getByRole('list')).toBeInTheDocument()
    })
  })
})
