import { NextFunction, Request, Response } from "express";
import { prisma } from "../..";
import { compare, hash } from "bcrypt";
import { generateAccessToken } from "../../libs/authentication";
import { User } from "@prisma/client";
import z from "zod";

const COOKIE_DURATION = 2629746000
const SALT_ROUND = process.env.SALT_ROUND || 10

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
            name:z.string().max(100),
            password:z.string().max(100).regex(passwordPattern),
            email:z.string().email()
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

        res.status(200).json(result)
    }
    catch (err) {
        next(err)
    }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = req.user
        console.log("🚀 ~ file: index.ts:99 ~ auth ~ result:", result)

        res.status(200).json(result)
    }
    catch (err) {
        next(err)
    }
}
