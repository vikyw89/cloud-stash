import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET as string

export const authenticateAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader || Array.isArray(authHeader)) return res.status(401)

  const token = authHeader.split(" ")[1]

  // check if token exist
  if (!token) return res.status(401)

  // check if it's verified
  const verifiedToken = jwt.verify(token, SECRET)
  
  req.user = verifiedToken
  next()
}

export const authenticateRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.cookies
  const refreshToken = cookie.refreshToken

  if (!refreshToken) return res.status(401)

  const isAuthenticated = jwt.verify(refreshToken, SECRET)

  if (!isAuthenticated) return res.status(401)

  next()
}