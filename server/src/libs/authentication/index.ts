import jwt from 'jsonwebtoken'
import { User } from '@prisma/client'

const SECRET = process.env.JWT_SECRET as string
const TOKEN_DURATION = '30d'

export const generateAccessToken = (user: Pick<User, "email" | "id">,duration=TOKEN_DURATION) => {
  const signedToken = jwt.sign({
    user
  }, SECRET, { expiresIn: duration });

  return signedToken
}