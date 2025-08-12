export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: { message: string; issues?: unknown[] } };
