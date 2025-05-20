import { ReturnModelType } from "@typegoose/typegoose";
import { Inverter, Inverter_MongoDB_Model } from "../../model/Inverter";
import { Panel, Panel_MongoDB_Model } from "../../model/Panel";
import Product from "../../model/abstract/Product";
import { modelMap } from "../../utils/ModelMap";
import { HttpError } from "../../utils/HttpError";


//busca o produto com base no código de barras
export const getProductByBarsCode = async (barsCode: string) => {

    //criando um tipo de mongoose model genérico para todo os produtos
    type ProductModel = ReturnModelType<typeof Inverter | typeof Panel>

    //cria uma lista com os modelos e adiciona os modelos de Inverter e painel a ela como se fossem genéricos(a fim apenas de buscar código de barras)
    const models: ProductModel[] = [Inverter_MongoDB_Model as ProductModel, Panel_MongoDB_Model as ProductModel]

    //percorre a lista de modelos e verifica dentro de cada documento se existe um código de barras igual ao do parâmetro
    for (const document of models) {
        const result = await document.findOne({ barsCode: barsCode })

        if (result) return result
    }

    return null
};

//realiza uma consulta no banco e retorna lista de produtos que existem e lista dos que nao existem em estoque
export const stockQuery = async (products: Product[]) => {
    try {
        const existing: Product[] = [];
        const nonExisting: Product[] = [];

        for (const item of products) {

            const stockProduct = await getProductByBarsCode(item.barsCode);

            if (stockProduct) {
                existing.push(stockProduct);
            } else {
                nonExisting.push(item);
            }
        }

        return { existing, nonExisting };

    } catch (error) {
        console.error(error);
        throw new HttpError("Erro ao verificar produtos");
    }
};

//recebe o produto, e o remove da collection conforme seu tipo/mongodb_model
export const removeFromStock = async (product: Product) => {
    //faz a desestruturação do obj
    const { type, barsCode } = product

    console.log(type)

    //atribui o model conforme seu type
    const model = modelMap[type]
    if (!model) throw new HttpError(`Produto com o type '${type}' não reconhecido`, 400, product)

    //faz o delete do produto na collection correspondente a seu type
    const result = await model.deleteOne({ barsCode })

    if (result.deleteCount === 0) {
        throw new HttpError(`Produto ${barsCode} não encontrado no banco de dados`, 404, product)
    }
}
//remove a lista de produtos do estoque
export const decreaseStock = async (productList: Product[]) => {
    return Promise.all(productList.map((product) => removeFromStock(product)))
}

