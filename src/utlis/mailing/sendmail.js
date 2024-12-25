"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_config_1 = __importDefault(require("./mail.config"));
function sendmail(to, subject, html) {
    const mailOptions = {
        from: 'jasmits007@gmail.com',
        to: to,
        subject: subject,
        html: html,
    };
    mail_config_1.default.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.error(err);
        }
        else {
            console.log(info);
        }
    });
}
exports.default = sendmail;
//# sourceMappingURL=sendmail.js.map