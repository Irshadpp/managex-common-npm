import { CustomeError } from "./custom-error";

export class NotAuthorizedError extends CustomeError{
    statusCode: number = 401;
    constructor(){
        super("Not authorized");
        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }

    serializeErrors(): { message: string; }[] {
        return [{message: "Not authorized"}]
    }
}