import { Router } from "express";
import { criaPedido, listaPedidos } from "../Service/Pedido";

const pedidoRouter = Router();

pedidoRouter.get("/", async (req, res, next) => {
    try {
        const pedidos = await listaPedidos();
        res.status(200).send({ pedidos });
    } catch (error) {
        next(error)
    }
});

pedidoRouter.post("/", async (req, res, next) => {
    try {
        const pedido = req.body;
        const result = await criaPedido(pedido);
        res.status(201).send(result);
    } catch (error: any) {
        next(error)
    }
});

export default pedidoRouter;
