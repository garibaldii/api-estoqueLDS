import { Router } from 'express'
import { getUserById } from '../service/UserService'


const userRouter = Router()



userRouter.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await getUserById(id)
        console.log(id)
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})



export default userRouter