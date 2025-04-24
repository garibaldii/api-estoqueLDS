import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'

import pedidoRouter from './src/Routes/Pedido';
import inversorRouter from './src/Routes/Produtos/Inversor';
import painelRouter from './src/Routes/Produtos/Painel'

import conectaBancoDados from './src/Database/db';
import { errorHandler } from './src/Middleware/ErrorHandler';
import { autenticarToken } from './src/Middleware/Auth';
import authRouter from './src/Routes/Auth';
import { produtoRouter } from './src/Routes/Produtos/Produto';

dotenv.config()

const app = express()
const port = 3000;

conectaBancoDados()   

app.use(express.json())
app.use(cors())

app.use("/conta", authRouter)
app.use("/pedido", autenticarToken,pedidoRouter)

app.use("/inversor", autenticarToken ,inversorRouter )
app.use("/painel", autenticarToken,painelRouter )
app.use("/produto", autenticarToken, produtoRouter)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port} 🚪`)
})