import { Router } from 'express'
import { usuarioCadastrado } from '../Service/Usuario'


const userRouter = Router()

userRouter.get("/:email", async (req, res, next) => {
    try {
        const { email } = req.params
        const result = await usuarioCadastrado(email)
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})



export default userRouter