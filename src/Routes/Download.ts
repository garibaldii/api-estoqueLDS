import { Router } from 'express'
import path from 'path'


const downloadRouter = Router()

downloadRouter.get("/file", (req, res, next) => {

    try {
        const filePath = path.join(__dirname, "../../public/text.txt")
        res.download(filePath, "text.txt")
    } catch (error) {
        next(error)
    }
})

export default downloadRouter