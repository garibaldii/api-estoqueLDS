import Produto from "./abstract/Produto";
import {prop, getModelForClass} from '@typegoose/typegoose'
//elimina a necessidade de um schemma, a partir das notacoes do typegoose
// a partir das notacoes da lib, o schemma é montado dentro da própria classe.


class Inversor extends Produto {

    @prop({required: true})
    public potencia: number

    @prop({required: true})
    public tensao: number;


    constructor(marca: string, modelo: string, codigoDeBarras: string, potencia: number, tensao: number) {
        super(marca, modelo, codigoDeBarras, "inversor"); //seta o tipo do inversor para servir de direcionamento para manipulação de objetos
        this.potencia = potencia
        this.tensao = tensao
    }



}

const Inversor_MongoDB_Model = getModelForClass(Inversor);

export  {Inversor, Inversor_MongoDB_Model}