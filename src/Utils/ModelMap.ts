import { Inverter_MongoDB_Model } from "../model/Inverter";
import { Panel_MongoDB_Model } from "../model/Panel";
//conforme forem surgindo novos produtos, adicionar aqui


//este mapeamento serve para identificarmos o model necessário para o tipo do produto, assim facilita sua locomoção entre collections
export const modelMap: Record<string, any> = {
    inverter: Inverter_MongoDB_Model,
    panel: Panel_MongoDB_Model
}