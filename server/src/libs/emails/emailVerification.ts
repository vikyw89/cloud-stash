import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    tls: {
        minDHSize: 512,
        minVersion: 'TLSv1',
        maxVersion: 'TLSv1.3',
        ciphers: 'ALL',
    },
    logger: true,
    debug: true, // include SMTP traffic in the logs
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
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