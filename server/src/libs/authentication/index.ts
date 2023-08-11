import jwt from 'jsonwebtoken'
import { User } from '@prisma/client'

const SECRET = process.env.JWT_SECRET as string
const TOKEN_DURATION = '1'

export const generateAccessToken = (user: Pick<User, "email" | "id">) => {
  const signedToken = jwt.sign({
    user
  }, SECRET, { expiresIn: TOKEN_DURATION });

  return signedToken
}