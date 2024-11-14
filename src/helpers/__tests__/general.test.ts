/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce, delay, formatPrice, isEqual } from '../general'

describe('delay function', () => {
  const measureTime = async (timeout?: number) => {
    const start = Date.now()
    await delay(timeout)
    const end = Date.now()

    return end - start
  }

  it('should resolve after the given timeout', async () => {
    const timeout = 1500
    expect(await measureTime(timeout)).toBeGreaterThanOrEqual(timeout)
  })

  it('should resolve immediately when no timeout is provided', async () => {
    expect(await measureTime()).toBeLessThan(10) // Should be very quick
  })
})

describe('formatPrice function', () => {
  it('should format a valid price correctly', () => {
    expect(formatPrice(10)).toBe('10 ETH')
    expect(formatPrice(0)).toBe('0 ETH')
    expect(formatPrice(-1)).toBe('-1 ETH')
  })

  it('should use comma as decimal separator)', () => {
    expect(formatPrice(100.1)).toBe('100,1 ETH')
    expect(formatPrice(30.125)).toBe('30,125 ETH')
    expect(formatPrice(2.0)).toBe('2 ETH')
    expect(formatPrice(-1.25)).toBe('-1,25 ETH')
  })

  it('should use dot as thousand separator)', () => {
    expect(formatPrice(100100.1)).toBe('100.100,1 ETH')
    expect(formatPrice(2012300.1)).toBe('2.012.300,1 ETH')
  })

  it('should return an empty string for invalid price', () => {
    expect(formatPrice(NaN)).toBe('')
  })
})

describe('isEqual function', () => {
  it('should return true for two identical objects', () => {
    const obj1 = { name: 'John', age: 30 }
    const obj2 = { name: 'John', age: 30 }
    expect(isEqual(obj1, obj2)).toBe(true)
  })

  it('should return false for objects with different properties', () => {
    const obj1 = { name: 'John', age: 30 }
    const obj2 = { name: 'John', age: 25 }
    expect(isEqual(obj1, obj2)).toBe(false)
  })

  it('should return false for objects with different keys', () => {
    const obj1 = { name: 'John', age: 30 }
    const obj2 = { name: 'John', city: 'New York' }
    expect(isEqual(obj1, obj2 as any)).toBe(false)
    expect(isEqual(obj1, { ...obj1, city: 'New York' } as any)).toBe(false)
  })

  it('should return false for objects with nested different values', () => {
    const obj1 = { name: 'John', details: { age: 30 } }
    const obj2 = { name: 'John', details: { age: 25 } }
    expect(isEqual(obj1, obj2)).toBe(false)
  })

  it('should return true for two empty objects', () => {
    const obj1 = {}
    const obj2 = {}
    expect(isEqual(obj1, obj2)).toBe(true)
  })

  it('should return false when comparing an object with a non-object', () => {
    const obj1 = { name: 'John' }
    const obj2 = 'John'
    expect(isEqual(obj1, obj2 as any)).toBe(false)
    expect(isEqual(obj2 as any, obj1)).toBe(false)
  })
})

// Mock function to be debounced
const mockFunction = jest.fn()

describe('debounce function', () => {
  beforeEach(() => {
    jest.useFakeTimers() // Mock the timers for control over setTimeout
    mockFunction.mockClear()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers() // Run any pending timers after each test
    jest.useRealTimers() // Restore real timers after tests are done
  })

  test('should call the function after the specified delay', () => {
    const debouncedFunc = debounce(mockFunction, 1000)

    debouncedFunc()
    jest.advanceTimersByTime(999) // Fast-forward time by 999ms
    expect(mockFunction).not.toBeCalled() // Function should not be called yet

    jest.advanceTimersByTime(1) // Fast-forward the final 1ms to complete the delay
    expect(mockFunction).toBeCalledTimes(1) // Function should be called once
  })

  test('should not call the function before the delay', () => {
    const debouncedFunc = debounce(mockFunction, 1000)

    debouncedFunc()
    jest.advanceTimersByTime(500) // Fast-forward time by 500ms
    expect(mockFunction).not.toBeCalled() // Function should not be called yet

    jest.advanceTimersByTime(500) // Fast-forward time by 500ms (total of 1000ms)
    expect(mockFunction).toBeCalledTimes(1) // Function should be called once
  })

  test('should reset the delay if called multiple times quickly', () => {
    const debouncedFunc = debounce(mockFunction, 1000)

    debouncedFunc()
    jest.advanceTimersByTime(500) // Fast-forward time by 500ms
    debouncedFunc() // Call again before the 1000ms delay is over

    // The timer should reset, so the function is not called yet
    jest.advanceTimersByTime(300) // Fast-forward another 300ms
    expect(mockFunction).toBeCalledTimes(0)

    jest.advanceTimersByTime(800) // Fast-forward the final 800
    expect(mockFunction).toBeCalledTimes(1) // Function should be called once in total
  })

  test('should execute function only once after multiple rapid calls', () => {
    const debouncedFunc = debounce(mockFunction, 500)

    debouncedFunc()
    debouncedFunc() // Call rapidly again
    debouncedFunc() // Call again rapidly

    // Only after 500ms should the function be called once
    jest.advanceTimersByTime(500)
    expect(mockFunction).toBeCalledTimes(1) // Function should be called only once
  })
})
