"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: true,
    requireTLS: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_PASSWORD
    }
});
// async..await is not allowed in global scope, must use a wrapper
async function sendVerificationEmail({ recipientAddress, url }) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"cloud-stash-app" <cloudstashapp@outlook.com>',
        to: `${recipientAddress}`,
        subject: "Verify your registration ✔",
        text: `go to this link to finish registration ${url}`,
        html: `<p>Go to this link to finish registration</p>
        <button href="${url}">Verify</button>
        ${url}
        `, // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
}
exports.sendVerificationEmail = sendVerificationEmail;
