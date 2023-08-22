import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import z from "zod";
import { prisma } from "../..";
import { sendEmail } from "../../helpers/emails/sendEmail";
import { TokenPayload } from "../../types";

export const COOKIE_DURATION = 2629746000
export const ACCESS_TOKEN_DURATION = '1h'
const SALT_ROUND = process.env.SALT_ROUND || 10
const SIGN_IN_URL = process.env.SIGN_IN_URL || 'http://localhost:3000/signIn'
const SERVER_BASE_URL = process.env.SERVER_BASE_URL || "http://localhost:3001/api"
const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error("please set .env JWT_SECRET")
}


/**
 * Given email, and password, attach jwt access token to header and cookie
 * @date 8/21/2023 - 12:04:51 PM
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const emailSignIn = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { email, password } = req.body

        const uuid = randomUUID()

        const dbResult = await prisma.user.update({
            where: {
                email
            },
            data: {
                refreshToken: uuid
            }
        })

        if (!dbResult) {
            throw new Error('invalid email')
        }

        if (!compare(password, dbResult.password)) {
            throw new Error('invalid password')
        }

        const tokenPayload = {
            email: dbResult.email,
            id: dbResult.id,
            name: dbResult.name,
            refreshToken: uuid
        } as TokenPayload

        // generate refresh token
        const token = jwt.sign(tokenPayload, JWT_SECRET)

        // if not activated yet, resend token through email
        if (dbResult.isVerified === false) {

            const verificationURL = `${SERVER_BASE_URL}/account/emailVerification/${token}`

            sendEmail({
                userEmail: email, subject: 'please verify your email address', content: `
                <h1>thank you for registering to cloud-stash, click the link below to validate your account</h1>
                <a href="${verificationURL}">VERIFY</a>
            `})

            res.status(200).json({ message: 'please check your email' })

        }

        // attach refreshToken in cookies
        res.cookie("token", token, { maxAge: COOKIE_DURATION, httpOnly: true, secure: true });

        // generate access token
        const accessToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_DURATION })

        res.status(200).header({ 'Authorization': `Bearer ${accessToken}` }).json({ message: 'signed in' })

    } catch (err) {

        next(err)

    }
}


/**
 * Clear cookies and header
 * @date 8/21/2023 - 12:09:12 PM
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const signOut = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // remove refresh token
        res.clearCookie('token')

        // remove access token   
        res.status(200).header({ 'Authorization': '' }).json({ message: 'signed out !' })

    } catch (err) {

        next(err)

    }
}


/**
 * Will register user into database, and send a verification link
 * 
 * @date 8/19/2023 - 9:07:35 PM
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const emailSignUp = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { name, password, email } = req.body as Pick<User, "name" | "password" | "email">
        const passwordPattern = new RegExp(
            String.raw`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`
        )

        const schema = z.object({
            name: z.string().max(100).min(1),
            password: z.string().max(100).regex(passwordPattern),
            email: z.string().email()
        })

        schema.parse({
            name,
            password,
            email
        })

        const dbResult = await prisma.user.create({
            data: {
                name,
                password: await hash(password, +SALT_ROUND),
                email,
            }
        })
        
        // send email verification
        const tokenPayload = {
            email: dbResult.email,
            id: dbResult.id,
            name: dbResult.name
        } as TokenPayload

        const token = jwt.sign(tokenPayload, JWT_SECRET)

        const verificationURL = `${SERVER_BASE_URL}/account/emailVerification/${token}`

        sendEmail({
            userEmail: email, subject: 'please verify your email address', content: `
            <h1>thank you for registering to cloud-stash, click the link below to validate your account</h1>
            <a href="${verificationURL}">VERIFY</a>
        `})

        res.status(200).json({ message: 'please check your email' })

    }
    catch (err) {

        next(err)

    }
}

export const emailVerification = async (req: Request, res: Response, next: NextFunction) => {

    try {

        // get email verifications param
        const { token } = req.params

        res.locals.token = token

        // verify token
        const data = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true })

        if (typeof data === "string" || !data) {

            throw new Error("invalid token !")

        }

        // find user with the same param
        // modify user to verified
        await prisma.user.update({
            where: {
                id: data.id,
            },
            data: {
                isVerified: true
            }
        })

        // redirect to website sign in
        res.status(200).redirect(SIGN_IN_URL)

    }

    catch (err) {

        next(err)

    }
}
