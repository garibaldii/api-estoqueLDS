import { Painel_MongoDB_Model, Painel } from "../../Model/Painel";
import { removeCodigoBarrasDuplicado } from "../../Utils/ProdutoUtils";
import { verificaCadastro } from "../../Validators/ValidadorProduto";


export const criaPainelEmLote = async (lista: any[]) => {
    try {
        const paineis: Painel[] = [];

        //formata a lista, para que não existam códigos de barras duplicados
        lista = removeCodigoBarrasDuplicado(lista)

        //verifica se existem produtos que já constam em banco
        await verificaCadastro(lista)

        lista.forEach((element: any) => {
            const { marca, modelo, codigoDeBarras, potencia } = element;
            paineis.push(new Painel(marca, modelo, codigoDeBarras, potencia));
        });

        return await Painel_MongoDB_Model.insertMany(paineis);

    } catch (err) {
        throw err;
    }
};





export const listaPaineis = async () => {
    return await Painel_MongoDB_Model.find()
}