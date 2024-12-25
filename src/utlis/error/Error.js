"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class error extends Error {
    constructor(message, statusCode, stack) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = error;
//# sourceMappingURL=Error.js.map