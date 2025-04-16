import Produto from "./abstract/Produto";
import { prop, getModelForClass } from '@typegoose/typegoose'
//elimina a necessidade de um schemma, a partir das notacoes do typegoose
// a partir das notacoes da lib, o schemma é montado dentro da própria classe.


class Painel extends Produto {

    @prop({ required: true })
    public potencia: number


    constructor(marca: string, modelo: string, codigoDeBarras: string, potencia: number) {
        super(marca, modelo, codigoDeBarras, "painel");//seta o tipo do inversor para servir de direcionamento para manipulação de objetos
        this.potencia = potencia

    }
}

const Painel_MongoDB_Model = getModelForClass(Painel);

export {Painel, Painel_MongoDB_Model}