import { NextFunction, Request, Response } from "express"
import { prisma } from "../.."


export const createCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body
        const result = await prisma.company.create({
            data: {
                name
            }
        })
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}