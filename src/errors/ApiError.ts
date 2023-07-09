class Api_Error extends Error {
  status_code: number;

  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message);
    this.status_code = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default Api_Error;
