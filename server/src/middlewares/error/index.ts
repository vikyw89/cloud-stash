import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { z } from "zod";

export async function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    switch (true) {
        case err instanceof Prisma.PrismaClientKnownRequestError: {
            res.status(400).json({ message: 'invalid input !', detail: { ...err, ref: 'https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes' } })
            break
        }
        case err instanceof z.ZodError: {
            res.status(400).json({ message: 'invalid input type !', detail: { ...err, ref: 'https://zod.dev/ERROR_HANDLING' } })
            break
        }
        case err instanceof jwt.TokenExpiredError: {
            res.status(400).json({ message: 'token is expired', detail: { ...err } })
            break
        }
        case err instanceof jwt.JsonWebTokenError: {
            res.status(400).json({ message: 'invalid token', detail: { ...err } })
            break
        }
        default: {
            res.status(500).json({ message: 'something broke !', detail: err })
        }
    }
    next()
}