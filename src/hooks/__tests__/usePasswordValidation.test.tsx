import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePasswordValidation, ValidationResult } from '../usePasswordValidation'
import { defaultRules } from '@/rules'

describe('usePasswordValidation', () => {
  // Existing tests remain the same...

  // Tests password visibility
  describe('password visibility', () => {
    it('initializes with password shown', () => {
      const { result } = renderHook(() => usePasswordValidation(defaultRules))
      expect(result.current.isPasswordVisible).toBe(true)
    })

    it('toggles password visibility', () => {
      const { result } = renderHook(() => usePasswordValidation(defaultRules))

      act(() => {
        result.current.togglePasswordVisibility()
      })
      expect(result.current.isPasswordVisible).toBe(false)

      act(() => {
        result.current.togglePasswordVisibility()
      })
      expect(result.current.isPasswordVisible).toBe(true)
    })
  })

  it('calls onValidationChange with false when input is cleared', () => {
    const onValidationChange = vi.fn()
    const { result } = renderHook(() => usePasswordValidation(defaultRules, onValidationChange))

    // Set a valid password first
    act(() => {
      result.current.changeInputChange('StrongPass123!')
    })
    // Clear the input
    act(() => {
      result.current.changeInputChange('')
    })

    // The last call should be with false and all rules invalid
    const lastCall = onValidationChange.mock.calls[onValidationChange.mock.calls.length - 1]
    expect(lastCall[0]).toBe(false)
    expect(lastCall[1].every((r: ValidationResult) => !r.isValid)).toBe(true)
  })

  // Tests callbacks
  describe('callbacks', () => {
    it('calls onValidationChange when validation state changes', () => {
      const onValidationChange = vi.fn()
      const { result } = renderHook(() => usePasswordValidation(defaultRules, onValidationChange))

      // Initial state (empty input)
      expect(onValidationChange).toHaveBeenCalledWith(false, expect.any(Array))

      // Valid password
      act(() => {
        result.current.changeInputChange('StrongPass123!')
      })
      expect(onValidationChange).toHaveBeenCalledWith(true, expect.any(Array))

      // Invalid password
      act(() => {
        result.current.changeInputChange('weak')
      })
      expect(onValidationChange).toHaveBeenCalledWith(false, expect.any(Array))
    })

    it('calls onValueChange when input value changes', () => {
      const onValueChange = vi.fn()
      const { result } = renderHook(() =>
        usePasswordValidation(defaultRules, undefined, onValueChange),
      )

      act(() => {
        result.current.changeInputChange('test123')
      })
      expect(onValueChange).toHaveBeenCalledWith('test123')

      act(() => {
        result.current.changeInputChange('')
      })
      expect(onValueChange).toHaveBeenCalledWith('')
    })

    it('handles both callbacks simultaneously', () => {
      const onValidationChange = vi.fn()
      const onValueChange = vi.fn()
      const { result } = renderHook(() =>
        usePasswordValidation(defaultRules, onValidationChange, onValueChange),
      )

      act(() => {
        result.current.changeInputChange('StrongPass123!')
      })

      expect(onValueChange).toHaveBeenCalledWith('StrongPass123!')
      expect(onValidationChange).toHaveBeenCalledWith(true, expect.any(Array))
    })
  })

  // Tests hasInvalidRules
  describe('hasInvalidRules', () => {
    it('returns true when any rule is invalid', () => {
      const { result } = renderHook(() => usePasswordValidation(defaultRules))

      act(() => {
        result.current.changeInputChange('weak')
      })
      expect(result.current.hasInvalidRules).toBe(true)
    })

    it('returns false when all rules are valid', () => {
      const { result } = renderHook(() => usePasswordValidation(defaultRules))

      act(() => {
        result.current.changeInputChange('StrongPass123!')
      })
      expect(result.current.hasInvalidRules).toBe(false)
    })

    it('returns true when input is empty', () => {
      const { result } = renderHook(() => usePasswordValidation(defaultRules))
      expect(result.current.hasInvalidRules).toBe(true)
    })
  })
})
