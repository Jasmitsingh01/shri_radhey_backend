"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function RequestHandler(func) {
    return async (req, res, next) => {
        Promise.resolve(func(req, res, next)).catch((err) => {
            next(err);
        });
    };
}
;
exports.default = RequestHandler;
//# sourceMappingURL=requestHandler.js.map