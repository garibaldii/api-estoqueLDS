import Product from "../model/abstract/Product";
import { stockQuery } from "../service/products/ProductService";
import { HttpError } from "../utils/HttpError";

export const verifyRegister = async (lista: Product[]) => {
    const { existing } = await stockQuery(lista);

    if (existing.length) {
        const codes = existing.map(p => p.barsCode);
        throw new HttpError(`Código(s) de barras já cadastrados : ${codes}`, 409);
    }

    // Caso não haja duplicados, retorna para continuar a execução
    return true;
};



