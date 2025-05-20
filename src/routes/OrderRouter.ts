import { Router } from "express";
import { createOrder, getOrders } from "../service/OrderService";

const orderRouter = Router();

orderRouter.get("/", async (req, res, next) => {
    try {
        const orders = await getOrders();
        res.status(200).send({ orders });
    } catch (error) {
        next(error)
    }
});

orderRouter.post("/", async (req, res, next) => {
    try {
        const data = req.body;
        const order = await createOrder(data);
        res.status(201).send({ message: "Pedido Criado com Sucesso!", order });
    } catch (error: any) {
        next(error)
    }
});

export default orderRouter;
