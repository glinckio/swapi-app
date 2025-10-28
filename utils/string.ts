export function isEmpty(str: string): boolean {
  return !str || str.trim().length === 0;
}

export function isUnknown(value: string): boolean {
  return value === "unknown" || value === "n/a" || isEmpty(value);
}

export function displayValue(value: string, fallback = "N/A"): string {
  return isUnknown(value) ? fallback : value;
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}
