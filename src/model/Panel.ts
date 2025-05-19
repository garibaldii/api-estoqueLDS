import { prop, getModelForClass } from '@typegoose/typegoose'
import Product from './abstract/Product';
//elimina a necessidade de um schemma, a partir das notacoes do typegoose
// a partir das notacoes da lib, o schemma é montado dentro da própria classe.


class Panel extends Product {

    @prop({ required: true })
    public power: number


    constructor(brand: string, model: string, barsCode: string, power: number) {
        super(brand, model, barsCode, "panel", new Date());//seta o tipo do inversor para servir de direcionamento para manipulação de objetos
        this.power = power

    }
}

const Panel_MongoDB_Model = getModelForClass(Panel);

export {Panel, Panel_MongoDB_Model}