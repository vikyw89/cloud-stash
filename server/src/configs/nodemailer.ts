export const NODEMAILER_CONFIG = {
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
}