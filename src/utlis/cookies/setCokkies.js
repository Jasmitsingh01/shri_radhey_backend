"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setCookies = (res, token) => {
    for (const key in token) {
        if (Object.prototype.hasOwnProperty.call(token, key)) {
            const element = token[key];
            res.cookie(key, element, {
                httpOnly: true,
            });
        }
    }
};
exports.default = setCookies;
//# sourceMappingURL=setCokkies.js.map