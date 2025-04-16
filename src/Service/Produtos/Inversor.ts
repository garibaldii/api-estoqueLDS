import { Inversor, Inversor_MongoDB_Model } from "../../Model/Inversor";
import { removeCodigoBarrasDuplicado } from "../../Utils/ProdutoUtils";
import { verificaCadastro } from "../../Validators/ValidadorProduto";


export const criaInversorEmLote = async (lista: any[]) => {
  try {
    const inversores: Inversor[] = []

    //remove caso tenham códigos de barras duplicados da lista
    lista = removeCodigoBarrasDuplicado(lista)

    //verifica se existem produtos que já constam em banco
    await verificaCadastro(lista)

    lista.forEach((element: any) => {
      const { marca, modelo, codigoDeBarras, potencia, tensao } = element
      inversores.push(new Inversor(marca, modelo, codigoDeBarras, potencia, tensao))
    });

    return await Inversor_MongoDB_Model.insertMany(inversores);

  } catch (error) {
    throw error
  }
};


export const listaInversores = () => Inversor_MongoDB_Model.find()


