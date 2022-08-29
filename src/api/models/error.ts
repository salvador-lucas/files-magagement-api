export interface ErrnoException extends Error {
  code?: number;
  path?: string;
  syscall?: string;
  stack?: string;
}
