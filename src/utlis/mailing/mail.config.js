"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'jasmits007@gmail.com',
        pass: 'fqaf qjjv awwu mliu',
    }
});
exports.default = transporter;
//# sourceMappingURL=mail.config.js.map