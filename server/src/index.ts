import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from "express";

const PORT = process.env.PORT || 3000;
const MAX_LIMITER = process.env.API_RATE_LIMIT || 60;
const app = express()

app.use(express.json())
const prismaRaw = new PrismaClient()

import rateLimit from 'express-rate-limit';

import { router as controllers } from './controllers';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: +MAX_LIMITER, // limit each IP to API_RATE_LIMIT requests per windowMs
    message: 'Too many requests from this IP. Please try again after 15 minutes.'
})

export const prisma = prismaRaw.$extends({
    // name: 'activity',
    // query: {
    //     async $allOperations({ operation, model, args, query }) {
    //         const start = performance.now()
    //         const [result] = await prismaRaw.$transaction([query(args)]) // wrap the query in a batch transaction, and destructure the result to return an array
    //         const end = performance.now()
    //         const time = end - start
    //         console.log({ start, result, end, time })
    //         console.log({ operation, model, args, query })
    //         return result
    //     },
    // },
});

app.use(cookieParser());
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(limiter)
app.use('/api', controllers)





app.get('*', (req: Request, res: Response) => {
    return res.status(200).send(`Welcome to cloud-stash server, running in [${process.env.NODE_ENV}] mode`)
})

app.use((err: Error, req: Request, res: Response) => {
    return res.send(err.message)
})

app.listen(PORT, () =>
    console.log(`REST API server ready at: http://localhost:${PORT}`),
)