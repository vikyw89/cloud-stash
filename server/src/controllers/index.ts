import { Request, Response, Router } from "express";
import { createUser, deleteUser, readUsers, updateUser } from "./user";

const router = new Router()

router.get('/', (req:Request, res:Response) => {
    res.send('api')
})

router.get('/user', readUsers)
router.post('/user', createUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export { router }