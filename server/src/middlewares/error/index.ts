import { Prisma } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import { z } from "zod";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        res.status(400).json({ message: 'invalid input !', detail: { ...err, ref: 'https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes' } })
    }

    else if (err instanceof z.ZodError) {
        res.status(400).json({ message: 'invalid input type !', detail: {...err, ref:'https://zod.dev/ERROR_HANDLING'}})
    }

    else {
        // if error is known, send code and status else, send 500 and something broke !
        res.status(500).json({ message: 'something broke !', detail: err })

        // TODO
        // send error log to file
        // https://github.com/vikyw89/cloud-stash/issues/new/choose
    }
    next()
}