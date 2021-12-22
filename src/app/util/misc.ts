export function pauseFor (ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function isEmptyObject (obj: object): boolean {
  if (!obj) return true
  return Object.keys(obj).length === 0 && obj.constructor === Object
}
