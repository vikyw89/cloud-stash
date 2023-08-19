import { Request, Response, Router } from "express";
import { createUser, deleteUser, readUser, readUsers, updateUser } from "./user";
import { emailSignIn, emailSignUp, emailVerification, signOut } from "./account";
import { authenticate } from "../middlewares/authentication";

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.json('api')
})

router.post('/account/emailSignIn', emailSignIn)
router.post('/account/emailSignUp', emailSignUp)
router.post('/account', signOut)
router.get('/account/emailVerification/:token', emailVerification)

// protected route
// authenticate refresh and jwt token
router.use(authenticate)


router.post('/user', createUser)
router.get('/user', readUsers)
router.get('/user/:id', readUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export { router }