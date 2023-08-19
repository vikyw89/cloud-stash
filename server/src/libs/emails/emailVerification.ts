import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    logger: true,
    debug: true, // include SMTP traffic in the logs
    auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_PASSWORD
    }
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendVerificationEmail({ recipientAddress, url }: { recipientAddress: string, url: string }) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"cloud-stash-app" <cloudstashapp@outlook.com>', // sender address
        to: `${recipientAddress}`, // list of receivers
        subject: "Verify your registration ✔", // Subject line
        text: `go to this link to finish registration ${url}`, // plain text body
        html: `<h1>Go to this link to finish registration</h1>
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