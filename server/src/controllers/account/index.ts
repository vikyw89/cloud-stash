import { NextFunction, Request, Response } from "express";
import { prisma } from "../..";
import { compare, hash } from "bcrypt";
import { generateAccessToken } from "../../libs/authentication";
import { User } from "@prisma/client";
import z from "zod";
import { sendVerificationEmail } from "../../libs/emails/emailVerification";
import jwt from 'jsonwebtoken'
import { AuthenticatedRequest } from "../../libs/types";

const COOKIE_DURATION = 2629746000
const SALT_ROUND = process.env.SALT_ROUND || 10
const SIGN_IN_URL = process.env.SIGN_IN_URL || 'http://localhost:3000/signIn'
const SERVER_BASE_URL = process.env.SERVER_BASE_URL || "http://localhost:3001/api"
const SECRET = process.env.JWT_SECRET as string


export const emailSignIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const result = await prisma.user.findFirst({
            where: {
                email,
            },
            include: {
                job: true
            }
        })

        if (!result) {
            throw new Error('invalid password')
        }
        
        if (!compare(password, result.password)) {
            throw new Error('invalid password')
        }
        
        // if not activated yet, resend token through email
        if (result.isVerified === false){
            const token = generateAccessToken({ email: email, id: result.id })
            
            await sendVerificationEmail({ recipientAddress: email, url: `${SERVER_BASE_URL}/account/emailVerification/${token}` })
            res.status(200).json({ message: 'check your email' })
        }
        
        const user = {
            email: result.email,
            id: result.id,
        } as Pick<User, "email" | "id">

        const accessToken = generateAccessToken(user)

        res.cookie("token", accessToken, { maxAge: COOKIE_DURATION, httpOnly: true, secure: true });

        return res.json({ Authorization: `Bearer ${accessToken}` })
    } catch (err) {
        next(err)
    }
}


export const signOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // remove refresh token
        res.clearCookie('refreshToken')

        // delete access token   
        return res.status(200).send(null)
    } catch (err) {
        next(err)
    }
}


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

        const result = await prisma.user.create({
            data: {
                name,
                password: await hash(password, +SALT_ROUND),
                email
            }
        })

        // send email verification
        // TODO
        // GENERATE TOKEN
        const token = generateAccessToken({ email: email, id: result.id })

        await sendVerificationEmail({ recipientAddress: email, url: `${SERVER_BASE_URL}/account/emailVerification/${token}` })
        res.status(200).json({ message: 'check your email' })
    }
    catch (err) {
        next(err)
    }
}

export const emailVerification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get email verifications param,
        const { token } = req.params
        res.locals.token = token

        // verify token
        const data = jwt.decode(token)

        if (typeof data === "string" || !data) {
            throw new Error("invalid token")
        }

        const user = data.user as Pick<User, "id" | "email">
        // find user with the same param,
        // modify user to verified

        await prisma.user.update({
            where: {
                id: user.id,
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

export const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const result = req.user
        res.status(200).json(result)
    }
    catch (err) {
        next(err)
    }
}
