// Small checks used by the forms. Each returns an error message, or "" when the value is fine.
export function checkRequired(value: string, label: string) {
  return value.trim() ? "" : `Enter your ${label}.`;
}
export function checkEmail(value: string) {
  if (!value.trim()) return "Enter your email address.";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Enter a valid email, like name@example.com.";
}
export function checkPassword(value: string) {
  if (!value) return "Enter a password.";
  if (value.length < 8) return "Use at least 8 characters.";
  if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) return "Use at least one letter and one number.";
  return "";
}
export function checkMatch(value: string, other: string) {
  if (!value) return "Enter the password again.";
  return value === other ? "" : "The two passwords do not match.";
}
// True when no field has an error.
export function isClean(errors: Record<string, string>) {
  return Object.values(errors).every((e) => !e);
}
