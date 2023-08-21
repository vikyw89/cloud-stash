import nodemailer from 'nodemailer'
import { NODEMAILER_CONFIG } from '../../configs/nodemailer';
import { SendMailProps } from '../../types';

export const sendEmail = ({ userEmail, subject, content }: SendMailProps) => {
    const transporter = nodemailer.createTransport(NODEMAILER_CONFIG)
    const mailOptions = {
        from: NODEMAILER_CONFIG.auth.user,
        to: userEmail,
        subject: subject,
        html: content
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error)
        console.log(`Email sent: ${info.response}`)
    })
}