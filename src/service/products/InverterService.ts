import { Inverter, Inverter_MongoDB_Model } from "../../model/Inverter";
import { removeDuplicatedBarsCode } from "../../utils/ProductUtils";
import { verifyRegister } from "../../validator/ValidateProducts";


export const postManyInverters = async (ls: any[]) => {
  try {
    const inverters: Inverter[] = []

    //remove caso tenham códigos de barras duplicados da lista
    ls = removeDuplicatedBarsCode(ls)

    //verifica se existem produtos que já constam em banco
    await verifyRegister(ls)

    ls.forEach((element: any) => {
      const { brand, model, barsCode, power, voltage } = element
      inverters.push(new Inverter(brand, model, barsCode, power, voltage))
    });

    return await Inverter_MongoDB_Model.insertMany(inverters);

  } catch (error) {
    throw error
  }
};


export const getInverters = () => Inverter_MongoDB_Model.find()