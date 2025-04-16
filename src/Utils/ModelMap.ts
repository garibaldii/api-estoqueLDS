import { Inversor_MongoDB_Model } from "../Model/Inversor";
import { Painel_MongoDB_Model } from "../Model/Painel";
//conforme forem surgindo novos produtos, adicionar aqui


//este mapeamento serve para identificarmos o model necessário para o tipo do produto, assim facilita sua locomoção entre collections
export const modelMap: Record<string, any> = {
    inversor: Inversor_MongoDB_Model,
    painel: Painel_MongoDB_Model
}