import { Router } from 'express'
import { login, registro } from '../Service/Auth'

const authRouter = Router()

authRouter.post("/registro", async (req, res, next) => {
    try {
        const { email, senha } = req.body
        await registro(email, senha)
        res.status(201).send({ msg: `Usuário cadastrado com sucesso!` })

    } catch (error) {
        next(error)
    }

})

authRouter.post("/login", async (req, res, next) => {
    try {
        const { email, senha } = req.body
        const token = await login(email, senha)
        res.status(201).send({ token })
    } catch (error) {
        next(error)
    }
});


export default authRouter
