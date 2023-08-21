"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_2 = require("../../configs/nodemailer");
const sendEmail = ({ userEmail, subject, content }) => {
    const transporter = nodemailer_1.default.createTransport(nodemailer_2.NODEMAILER_CONFIG);
    const mailOptions = {
        from: nodemailer_2.NODEMAILER_CONFIG.auth.user,
        to: userEmail,
        subject: subject,
        html: content
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error)
            return console.log(error);
        console.log(`Email sent: ${info.response}`);
    });
};
exports.sendEmail = sendEmail;
