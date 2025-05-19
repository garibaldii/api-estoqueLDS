import { Router } from 'express'
import path from 'path'
import multer from 'multer'
import { uploadProductFile } from '../service/ExcelService'


const fileRouter = Router()


fileRouter.get("/download", (req, res, next) => {
    //get the excel model
    try {
        const filePath = path.join(__dirname, "../../public/planilha-modelo-lds.xlsx")
        res.download(filePath, "planilha-modelo-lds.xlsx")
    } catch (error) {
        next(error)
    }
})

const upload = multer({ storage: multer.memoryStorage() })
fileRouter.post("/upload", upload.single("file"), async (req, res, next) => {
    try {

        const buffer = req.file?.buffer

        if (!buffer) {
            res.status(400).json({ message: "Arquivo nao encontrado" })
            return
        }

        const response = await uploadProductFile(buffer)

        res.status(201).send({
            message: "Produtos Cadastrados com Sucesso! 🥳🎉",
            response
        })

    } catch (error) {
        next(error)
    }
})

export default fileRouter