import { CustomeError } from "./custom-error";

export class BadRequestError extends CustomeError {
  statusCode: number = 400;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors(): { message: string }[] {
    console.log([{message: this.message}]);
    return [{ message: this.message }];
  }
}
