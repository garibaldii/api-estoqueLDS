import Produto from "../Model/abstract/Produto";
import { consultaEstoque } from "../Service/Produtos/Produto";
import { HttpError } from "../Utils/HttpError";

export const verificaCadastro = async (lista: Produto[]) => {
    const { existentes } = await consultaEstoque(lista);

    if (existentes.length) {
        const codigos = existentes.map(p => p.codigoDeBarras);
        throw new HttpError(`Código(s) de barras já cadastrados : ${codigos}`, 409);
    }

    // Caso não haja duplicados, retorna para continuar a execução
    return true;
};



