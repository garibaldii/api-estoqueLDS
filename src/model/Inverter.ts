import { prop, getModelForClass } from '@typegoose/typegoose'
import Product from "./abstract/Product";
//elimina a necessidade de um schemma, a partir das notacoes do typegoose
// a partir das notacoes da lib, o schemma é montado dentro da própria classe.


class Inverter extends Product {

    @prop({ required: true })
    public power: number

    @prop({ required: true })
    public voltage: number;

    constructor(brand: string, model: string, barsCode: string, power: number, voltage: number) {
        super(brand, model, barsCode, "inverter", new Date()); //seta o tipo do inversor para servir de direcionamento para manipulação de objetos
        this.power = power
        this.voltage = voltage
    }



}

const Inverter_MongoDB_Model = getModelForClass(Inverter);

export { Inverter, Inverter_MongoDB_Model }