import { Panel, Panel_MongoDB_Model } from "../../model/Panel";
import { removeDuplicatedBarsCode } from "../../utils/ProductUtils";
import { verifyRegister } from "../../validator/ValidateProducts";


export const postManyPanels = async (ls: any[]) => {
    try {
        const panels: Panel[] = [];

        //formata a lista, para que não existam códigos de barras duplicados
        ls = removeDuplicatedBarsCode(ls)

        //verifica se existem produtos que já constam em banco
        await verifyRegister(ls)

        ls.forEach((element: any) => {
            const { brand, model, barsCode, power } = element;
            panels.push(new Panel(brand, model, barsCode, power));
        });

        return await Panel_MongoDB_Model.insertMany(panels);

    } catch (err) {
        throw err;
    }
};





export const getPanels = async () => {
    return await Panel_MongoDB_Model.find()
}