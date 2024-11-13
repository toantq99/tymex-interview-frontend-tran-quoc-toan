export const delay = (timeout?: number) =>
  new Promise(resolve => setTimeout(resolve, timeout))

export const formatPrice = (rawPrice: number): string => {
  if (Number.isNaN(Number(rawPrice))) return ''

  return `${rawPrice.toLocaleString('vi-VN')} ETH`
}

export const isEqual = <T extends object>(obj1: T, obj2: T) => {
  // Check properties in obj1
  for (const key in obj1) {
    if (Object.hasOwn(obj1, key)) {
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
  }

  // Check properties in obj2 that are not in obj1
  for (const key in obj2) {
    if (Object.hasOwn(obj2, key) && !Object.hasOwn(obj1, key)) {
      return false
    }
  }

  return true
}
