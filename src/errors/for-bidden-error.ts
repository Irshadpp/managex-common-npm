import { CustomeError } from "./custom-error";

export class ForbiddenError extends CustomeError {
    statusCode: number = 403;

    constructor() {
        super("Forbidden");
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }

    serializeErrors(): { message: string }[] {
        return [{ message: "Forbidden" }];
    }
}
