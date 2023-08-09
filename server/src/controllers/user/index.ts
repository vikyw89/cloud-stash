import { NextFunction, Request, Response } from "express"
import { prisma } from "../.."

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, password, email } = req.body
        const result = await prisma.user.create({
            data: {
                name,
                password,
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

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { name, password, email } = req.body
        const result = await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                password,
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
        const { id } = req.params
        const result = await prisma.user.delete({
            where: {
                id: id
            }
        })
        console.log("🚀 ~ file: index.ts:58 ~ deleteUser ~ result:", result)
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}