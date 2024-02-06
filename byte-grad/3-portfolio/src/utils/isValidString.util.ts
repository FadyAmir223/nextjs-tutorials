export const isValidString = (value: unknown, maxLength: number) =>
  value && typeof value === 'string' && value.length <= maxLength ? true : false
