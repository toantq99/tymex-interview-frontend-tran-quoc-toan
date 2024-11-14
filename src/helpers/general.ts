export const delay = (timeout?: number) =>
  new Promise(resolve => setTimeout(resolve, timeout))

export const formatPrice = (rawPrice: number): string => {
  if (Number.isNaN(Number(rawPrice))) return ''

  return `${rawPrice.toLocaleString('vi-VN')} ETH`
}

export const isEqual = <T extends object>(obj1: T, obj2: T) => {
  // Check properties in obj1
  for (const key in obj1) {
    if (Object.hasOwn(obj2, key)) {
      // If values are different
      if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
        return false
      }
    } else {
      // Property exists in obj1 but not in obj2
      return false
    }
  }

  // Check properties in obj2 that are not in obj1
  for (const key in obj2) {
    if (Object.hasOwn(obj2, key) && !Object.hasOwn(obj1, key)) {
      return false
    }
  }

  return true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  immediate: boolean = false
) => {
  let timeoutId: NodeJS.Timer

  return (...args: Parameters<T>) => {
    if (immediate && !timeoutId) {
      fn(...args) // Execute the function immediately
    }

    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      fn(...args) // Execute the function after the specified delay
    }, delay)
  }
}
