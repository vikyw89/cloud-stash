import { NextFunction, Request, Response } from "express"

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log("🚀 ~ file: index.ts:4 ~ errorHandler ~ err:", err)
    res.status(500).send(err.message);
    next()
}