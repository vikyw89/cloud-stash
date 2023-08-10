import { NextFunction, Request, Response } from "express";
import { prisma } from "../..";
import { compare } from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../libs/authentication";
import { User } from "../../templates";

const COOKIE_DURATION = 2629746000

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
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

        if (!result) return res.status(404).send('invalid username')
        if (!compare(password, result.password)) return res.status(406).send('invalid password')

        const user = {
            email,
            id: result.id,
            job: result.job
        } as User

        const refreshToken = generateRefreshToken(user)
        res.cookie("refreshToken", refreshToken, { maxAge: COOKIE_DURATION, httpOnly: true, secure: true });

        const accessToken = generateAccessToken(user)
        return res.send(accessToken)
    } catch (err) {
        next(err)
    }
}

export const signOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // remove refresh token
        res.cookie("refreshToken", null)
        // delete access token   
        return res.status(200).send(null)
    } catch (err) {
        next(err)
    }
}