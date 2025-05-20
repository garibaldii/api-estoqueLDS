import { Router } from "express"
import { getInverters } from "../../service/products/InverterService";
import { postManyInverters } from "../../service/products/InverterService";
const inverterRouter = Router()

//GET Retorna todos os inversores
inverterRouter.get("/", async (req, res, next) => {
    try {
        const inverters = await getInverters();
        res.status(200).send({ inverters });
    } catch (error) {
        next(error)
    }
});


//POST MANY cadastra vários inversores
inverterRouter.post("/", async (req, res, next) => {
    try {

        const data = req.body

        const inverters = await postManyInverters(data)

        res.status(201).send({
            message: `Inversores Cadastrados com Sucesso!`,
           inverters
        })  
    } catch (error: any) {
        next(error)
    }
})



export default inverterRouter