import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePasswordValidation } from '../usePasswordValidation'
import { defaultRules } from '@/rules'

describe('usePasswordValidation', () => {
  it('should initialize with empty input and no validation results', () => {
    const { result } = renderHook(() => usePasswordValidation(defaultRules))

    expect(result.current.inputValue).toBe('')
    expect(result.current.validationResults).toEqual([])
  })

  it('should update input value and validation results when input changes', () => {
    const { result } = renderHook(() => usePasswordValidation(defaultRules))

    act(() => {
      result.current.changeInputChange('Test123!')
    })

    expect(result.current.inputValue).toBe('Test123!')
    expect(result.current.validationResults).toHaveLength(defaultRules.rules.length)
    expect(result.current.validationResults.every((r) => r.isValid)).toBe(true)
  })

  it('should mark rules as invalid for non-compliant passwords', () => {
    const { result } = renderHook(() => usePasswordValidation(defaultRules))

    act(() => {
      result.current.changeInputChange('weak')
    })

    expect(result.current.validationResults.some((r) => !r.isValid)).toBe(true)
  })
})
