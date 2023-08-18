import { NextFunction, Request, Response } from "express"
import { prisma } from "../.."
import { hash } from "bcrypt"
import { User } from "@prisma/client"


const SALT_ROUND = process.env.SALT_ROUND || 10


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, password, email } = req.body as Pick<User, "name" | "password" | "email">

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


export const readUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await prisma.user.findMany()

        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}


export const readUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const result = await prisma.user.findFirst({
            where: {
                id
            }
        })

        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}


export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user as Pick<User,"id"|"email">

        const { id } = req.params

        if (id !== user.id) return res.status(401)

        const { name, password, email } = req.body

        const result = await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                password: await hash(password, +SALT_ROUND),
                email
            }
        })

        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}


export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user as Pick<User, "id" | "email">

        const { id } = req.params

        if (id !== user.id) return res.status(401)

        const result = await prisma.user.delete({
            where: {
                id: id
            }
        })

        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}