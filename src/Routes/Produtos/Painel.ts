import { Router } from "express";
import { criaPainelEmLote, listaPaineis } from "../../Service/Produtos/Painel";

const painelRouter = Router()

painelRouter.get("/", async (req, res, next) => {
    try {
        const paineis = await listaPaineis()
        res.status(200).send({
            message: "Paineis Cadastrados:",
            paineis
        })
    } catch (error) {
        next(error)
     }
})



//POST MANY
painelRouter.post("/", async (req, res, next) => {
    try {
        let dados = req.body

        const paineis = await criaPainelEmLote(dados)


        res.status(201).send({
            message: `Paineis Cadastrados com Sucesso!`,
            paineis
        })


    } catch (error: any) {
        next(error)
    }
})


export default painelRouter