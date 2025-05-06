import { Pedido, Pedido_MongoDB_Model } from "../Model/Pedido";
import { HttpError } from "../Utils/HttpError";
import { removeCodigoBarrasDuplicado } from "../Utils/ProdutoUtils";
import { darBaixa, consultaEstoque } from "./Produtos/Produto";

export const listaPedidos = () => Pedido_MongoDB_Model.find()

export const criaPedido = async (value: any) => {
    try {
        const { codigoPedido, listaProdutos } = value;

        // Verifica se os produtos existem no banco de dados
        let { existentes, inexistentes } = await consultaEstoque(listaProdutos);

        // Se não existirem, retorna erro
        if (inexistentes.length) {
            const codigos = inexistentes.map(p => p.codigoDeBarras);
            throw new HttpError(
                `Código de barras não encontrado no banco de dados: ${codigos}, verifique se efetuou o cadastro`,
                404,
                inexistentes);
        }

        //formata o pedido, para que não existam códigos de barras duplicados
        existentes = removeCodigoBarrasDuplicado(existentes)

        // dá baixa no estoque
        await darBaixa(existentes);

        // Criação do pedido
        return await Pedido_MongoDB_Model.create(new Pedido(codigoPedido, existentes, new Date()));

    } catch (err: any) {

        throw err;
    }
};




