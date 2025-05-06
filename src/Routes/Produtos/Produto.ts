import { Router } from "express"
import { retornaProdutoPeloCodigoDeBarras } from "../../Service/Produtos/Produto"

export const produtoRouter = Router()

produtoRouter.get("/:codigoDeBarras", async (req, res, next) => {
    try {
        const {codigoDeBarras} = req.params
        const produto = await retornaProdutoPeloCodigoDeBarras(codigoDeBarras)
        res.status(200).send({
            message: `Produto Encontrado!`,
            produto
        })
    } catch (error) {
        next(error)
    }
})