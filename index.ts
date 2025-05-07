import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'

import pedidoRouter from './src/Routes/Pedido';
import inversorRouter from './src/Routes/Produtos/Inversor';
import painelRouter from './src/Routes/Produtos/Painel'

import conectaBancoDados from './src/Database/db';
import { errorHandler } from './src/middleware/ErrorHandler';
import { autenticarToken } from './src/middleware/Auth';

import userRouter from './src/Routes/Usuario';
import authRouter from './src/Routes/Auth';
import { produtoRouter } from './src/Routes/Produtos/Produto';

dotenv.config()

const app = express()
const port = Number(process.env.PORT) || 8081;

conectaBancoDados()   

app.use(express.json())
app.use(cors())

app.use("/conta", authRouter)
app.use("/usuario", userRouter)
app.use("/pedido", autenticarToken,pedidoRouter)

app.use("/inversor", autenticarToken ,inversorRouter )
app.use("/painel", autenticarToken,painelRouter )
app.use("/produto", autenticarToken, produtoRouter)

app.use(errorHandler)

app.listen(port, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${port} 🚪`)
})