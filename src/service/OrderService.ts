import { Order, Order_MongoDB_Model } from "../model/Order";
import { HttpError } from "../utils/HttpError";
import { removeDuplicatedBarsCode } from "../utils/ProductUtils";
import { decreaseStock, stockQuery } from "./products/ProductService";


export const getOrders = () => Order_MongoDB_Model.find()

export const createOrder = async (orderData: any) => {
    try {
        const { orderCode, productList } = orderData;

        // Verifica se os produtos existem no banco de dados
        let { existing, nonExisting } = await stockQuery(productList);

        // Se não existirem, retorna erro
        if (nonExisting.length) {
            const codes = nonExisting.map(p => p.barsCode);
            throw new HttpError(
                `Código de barras não encontrado no banco de dados: ${codes}, verifique se efetuou o cadastro`,
                404,
                nonExisting);
        }

        //formata o pedido, para que não existam códigos de barras duplicados
        existing = removeDuplicatedBarsCode(existing)

        // dá baixa no estoque
        await decreaseStock(existing);

        // Criação do pedido
        return await Order_MongoDB_Model.create(new Order(orderCode, existing, new Date()));

    } catch (err: any) {

        throw err;
    }
};




