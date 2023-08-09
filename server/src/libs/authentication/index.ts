import jwt from 'jsonwebtoken'
import { User } from '../../templates'

const SECRET = process.env.JWT_SECRET as string
const TOKEN_DURATION = '15m'

export const generateRefreshToken = (user: User) => {
  const signedToken = jwt.sign({
    user
  }, SECRET)
  return signedToken
}

export const generateAccessToken = (user: User) => {
  const signedToken = jwt.sign({
    user
  }, SECRET, { expiresIn: TOKEN_DURATION });
  return signedToken
}