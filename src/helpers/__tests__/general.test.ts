/* eslint-disable @typescript-eslint/no-explicit-any */
import { delay, formatPrice, isEqual } from '../general'

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
