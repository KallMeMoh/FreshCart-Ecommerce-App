class UnauthorizedError extends Error {
  name: string = 'Unauthorized';
  constructor(message: string = 'Session has expired') {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export { UnauthorizedError };
