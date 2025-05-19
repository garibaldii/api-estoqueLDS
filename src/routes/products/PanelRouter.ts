import { Router } from "express";
import { postManyPanels, getPanels } from "../../service/products/PanelService";

const painelRouter = Router()

painelRouter.get("/", async (req, res, next) => {
    try {
        const panels = await getPanels()
        res.status(200).send({
            panels
        })
    } catch (error) {
        next(error)
    }
})



//POST MANY
painelRouter.post("/", async (req, res, next) => {
    try {
        let data = req.body

        const panels = await postManyPanels(data)


        res.status(201).send({
            message: `Paineis Cadastrados com Sucesso!`,
            panels
        })


    } catch (error: any) {
        next(error)
    }
})


export default painelRouter