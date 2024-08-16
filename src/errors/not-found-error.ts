import { CustomeError } from "./custom-error";

export class NotFoundError extends CustomeError{
    statusCode: number = 404;
    constructor(){
        super("Route not found");
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(): { message: string; }[] {
        return [{message: "Not found"}];
    }
}