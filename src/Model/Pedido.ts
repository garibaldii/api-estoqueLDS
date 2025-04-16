import { getModelForClass, prop } from "@typegoose/typegoose";
import Produto from "./abstract/Produto";

class Pedido{

    @prop({required: true})
    public listaProdutos: Produto[]
    
    @prop({required: true})
    public codigoPedido: string

    @prop({required:true})
    public dataSaida: Date


    constructor(codigoPedido: string, listaProdutos: Produto[], dataSaida: Date){
        this.codigoPedido = codigoPedido;
        this.listaProdutos = listaProdutos;
        this.dataSaida = dataSaida
    }

}

const Pedido_MongoDB_Model = getModelForClass(Pedido)

export {Pedido, Pedido_MongoDB_Model}