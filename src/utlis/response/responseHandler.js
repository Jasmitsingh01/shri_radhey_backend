"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ResponseHandler(res, data, status = 200) {
    res.status(status).send(data);
}
exports.default = ResponseHandler;
//# sourceMappingURL=responseHandler.js.map