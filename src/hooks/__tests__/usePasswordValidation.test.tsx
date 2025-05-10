import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePasswordValidation } from '../usePasswordValidation'
import { defaultRules } from '@/rules'

describe('usePasswordValidation', () => {
  it('initializes with empty input and all rules invalid', () => {
    const { result } = renderHook(() => usePasswordValidation(defaultRules))

    expect(result.current.inputValue).toBe('')
    expect(result.current.validationResults).toHaveLength(defaultRules.rules.length)
    expect(result.current.validationResults.every((result) => !result.isValid)).toBe(true)
  })

  it('updates input value and validates rules', () => {
    const { result } = renderHook(() => usePasswordValidation(defaultRules))

    act(() => {
      result.current.changeInputChange('Test123!')
    })

    expect(result.current.inputValue).toBe('Test123!')
    expect(result.current.validationResults).toHaveLength(defaultRules.rules.length)
  })

  it('resets validation results when input is empty', () => {
    const { result } = renderHook(() => usePasswordValidation(defaultRules))

    // First set a valid password
    act(() => {
      result.current.changeInputChange('Test123!')
    })

    // Then clear it
    act(() => {
      result.current.changeInputChange('')
    })

    expect(result.current.inputValue).toBe('')
    expect(result.current.validationResults.every((result) => !result.isValid)).toBe(true)
  })

  it('validates rules correctly for different inputs', () => {
    const { result } = renderHook(() => usePasswordValidation(defaultRules))

    // Test with invalid password
    act(() => {
      result.current.changeInputChange('weak')
    })

    expect(result.current.validationResults.some((result) => !result.isValid)).toBe(true)

    // Test with valid password
    act(() => {
      result.current.changeInputChange('StrongPass123!')
    })

    expect(result.current.validationResults.every((result) => result.isValid)).toBe(true)
  })
})
