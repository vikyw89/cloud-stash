"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODEMAILER_CONFIG = void 0;
exports.NODEMAILER_CONFIG = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    logger: true,
    debug: true,
    auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_PASSWORD
    }
};
