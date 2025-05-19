import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'

import orderRouter from './src/routes/OrderRouter';
import inverterRouter from './src/routes/products/InverterRouter';
import painelRouter from './src/routes/products/PanelRouter'
import fileRouter from './src/routes/FileRouter';

import databaseConnection from './src/database/db';
import { errorHandler } from './src/middleware/ErrorHandler';
import { authToken } from './src/middleware/Auth';

import userRouter from './src/routes/UserRouter';
import authRouter from './src/routes/AuthRouter';
import { productRouter } from './src/routes/products/ProductRouter';

dotenv.config()

const app = express()
const port = Number(process.env.PORT) || 8081;

databaseConnection()

app.use(express.json())
app.use(cors())

app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/order", authToken, orderRouter)

app.use("/inverter", authToken, inverterRouter)
app.use("/panel", authToken, painelRouter)
app.use("/product", authToken, productRouter)
app.use("/file", fileRouter)

app.use(errorHandler)

app.listen(port, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${port} 🚪`)
})