import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET as string


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    // we will compare jwt and cookies, if they aren't the same we will notify user of an account breach
    const cookie = req.cookies

    const refreshToken = cookie.token

    const headers = req.headers?.authorization

    if (!headers || !refreshToken) {
      // suggest user to sign in
      throw new Error('please sign in')
    }

    const accessToken = headers && headers.split(" ")[1]

    if (accessToken !== refreshToken) {
      // user account is comprommised
      throw new Error('account is compromised, please change password')
    }

    const user = jwt.verify(refreshToken, SECRET)

    req.user = user

    next()
  } catch (err) {
    next(err)
  }
}
