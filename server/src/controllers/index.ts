import { Request, Response, Router } from "express";
import { createUser, deleteUser, readUser, readUsers, updateUser } from "./user";
import { signIn, signOut } from "./account";
import { authenticateAccessToken, authenticateRefreshToken } from "../middlewares/authentication";

//@ts-ignore
const router = new Router()

router.get('/', (req:Request, res:Response) => {
    res.send('api')
})

router.post('/account/signin', signIn)
router.get('/account/refreshAccessToken')
router.post('/user', createUser)

// protected route
router.use(authenticateRefreshToken, authenticateAccessToken)
router.post('/account/signout', signOut)


router.get('/user', readUsers)
router.get('/user/:id', readUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export { router }