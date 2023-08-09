import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET as string

export const authenticateAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader || Array.isArray(authHeader)) return res.send('no authentication')

  const token = authHeader.split(" ")[1]

  // check if token exist
  if (!token) return res.send('no authentication')

  // check if it's verified
  const verifiedToken = jwt.verify(token, SECRET)
  
  req.user = verifiedToken
  next()
}

export const authenticateRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.cookies
  const refreshToken = cookie.refreshToken
  if (!refreshToken) return res.send("please sign in")

  const isAuthenticated = jwt.verify(refreshToken, SECRET)

  if (!isAuthenticated) return res.send("session expired, please sign in")

  next()
}