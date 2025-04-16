import { Router } from "express"
import { criaInversorEmLote, listaInversores } from "../../Service/Produtos/Inversor";

const inversorRouter = Router()

//GET Retorna todos os inversores
inversorRouter.get("/", async (req, res, next) => {
    try {
        const inversores = await listaInversores();
        res.status(200).send(inversores);
    } catch (error) {
        next(error)
    }
});


//POST MANY cadastra vários inversores
inversorRouter.post("/", async (req, res, next) => {
    try {

        const dados = req.body

        const inversoresCadastrados = await criaInversorEmLote(dados)

        res.status(201).send({
            message: `Inversores Cadastrados com Sucesso!`,
            inversoresCadastrados
        })
    } catch (error: any) {
        next(error)
    }
})



export default inversorRouter