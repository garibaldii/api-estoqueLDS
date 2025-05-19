import { Router } from "express"
import { getProductByBarsCode } from "../../service/products/ProductService"

export const productRouter = Router()

productRouter.get("/:barsCode", async (req, res, next) => {
    try {
        const { barsCode } = req.params
        const product = await getProductByBarsCode(barsCode)
        res.status(200).send({
            message: `Produto Encontrado!`,
            product
        })
    } catch (error) {
        next(error)
    }
})