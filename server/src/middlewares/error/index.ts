import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { z } from "zod";

export async function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    switch (true) {
        case err instanceof Prisma.PrismaClientKnownRequestError: {       
            res.status(400).json({ ...err, ref: 'https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes',message: 'invalid input !' } )
            break
        }
        case err instanceof z.ZodError: {
            res.status(400).json({ ...err, ref: 'https://zod.dev/ERROR_HANDLING',message: 'invalid input type !'})
            break
        }
        case err instanceof jwt.TokenExpiredError: {
            res.status(400).json({ ...err,message: 'token is expired'})
            break
        }
        case err instanceof jwt.JsonWebTokenError: {
            res.status(400).json({  ...err,message: 'invalid token' })
            break
        }
        default: {
            res.status(500).json({...err,message: 'something went wrong !' })
        }
    }
    next()
}