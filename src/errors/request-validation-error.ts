import { ValidationError } from "express-validator";
import { CustomeError } from "./custom-error";

export class RequestValidationError extends CustomeError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Request parameter error");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): { message: string }[] {
    return this.errors.map((err) => {
      return { message: err.msg };
    });
  }
}
