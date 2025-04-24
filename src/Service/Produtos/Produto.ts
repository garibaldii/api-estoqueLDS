import { ReturnModelType } from "@typegoose/typegoose";
import { Inversor, Inversor_MongoDB_Model } from "../../Model/Inversor";
import { Painel, Painel_MongoDB_Model } from "../../Model/Painel";
import Produto from "../../Model/abstract/Produto";
import { modelMap } from "../../Utils/ModelMap";
import { HttpError } from "../../Utils/HttpError";


//busca o produto com base no código de barras
export const retornaProdutoPeloCodigoDeBarras = async (codigoDeBarras: string) => {

    //criando um tipo de mongoose model genérico para todo os produtos
    type ProdutoModel = ReturnModelType<typeof Inversor | typeof Painel>

    //cria uma lista com os modelos e adiciona os modelos de inversor e painel a ela como se fossem genéricos(a fim apenas de buscar código de barras)
    const models: ProdutoModel[] = [Inversor_MongoDB_Model as ProdutoModel, Painel_MongoDB_Model as ProdutoModel]

    //percorre a lista de modelos e verifica dentro de cada documento se existe um código de barras igual ao do parâmetro
    for (const document of models) {
        const result = await document.findOne({ codigoDeBarras })

        if (result) return result
    }

    return null
};

//realiza uma consulta no banco e retorna lista de produtos que existem e lista dos que nao existem em estoque
export const consultaEstoque = async (produtos: Produto[]) => {
    try {
        const existentes: Produto[] = [];
        const inexistentes: Produto[] = [];

        for (const item of produtos) {

            const produtoBancoDados = await retornaProdutoPeloCodigoDeBarras(item.codigoDeBarras);

            if (produtoBancoDados) {
                existentes.push(produtoBancoDados);
            } else {
                inexistentes.push(item);
            }
        }

        return { existentes, inexistentes };

    } catch (error) {
        console.error(error);
        throw new HttpError("Erro ao verificar produtos");
    }
};

//recebe o produto, e o remove da collection conforme seu tipo/mongodb_model
export const removerDoEstoque = async (produto: Produto) => {
    //faz a desestruturação do obj
    const { tipo, codigoDeBarras } = produto

    console.log(tipo)

    //atribui o model conforme seu tipo
    const model = modelMap[tipo]
    if (!model) throw new HttpError(`Produto com o tipo '${tipo}' não reconhecido`, 400, produto)

    //faz o delete do produto na collection correspondente a seu tipo
    const result = await model.deleteOne({ codigoDeBarras })

    if (result.deleteCount === 0) {
        throw new HttpError(`Produto ${codigoDeBarras} não encontrado no banco de dados`, 404, produto)
    }
}
//remove a lista de produtos do estoque
export const darBaixa = async (listaProdutos: Produto[]) => {
    return Promise.all(listaProdutos.map((produto) => removerDoEstoque(produto)))
}

