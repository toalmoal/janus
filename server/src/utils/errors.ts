export class BaseError extends Error {
  code: number;
  message: string;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.message = message;
    Object.setPrototypeOf(this, new.target.prototype);
  }

}

export const NotFound = (message: string) => new BaseError(404, message);
export const BadRequest = (message: string) => new BaseError(400, message);
export const Unauthorised  = (message: string = 'You are not authorized to access this resource') => new BaseError(401, message);
