class BadRequestError extends Error {
  name: string = "BadRequest";
  constructor(message: string = "Session has expired") {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export { BadRequestError };
