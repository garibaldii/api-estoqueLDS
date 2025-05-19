import { prop } from "@typegoose/typegoose";
//typegoose é uma biblioteca que permite automatizarmos o processo de criação de collection,
//com ele podemos adicionar as propriedades diretamente em uma classe, e a partir daí ele faz 
//o map com a estruturação do schema. 

export default abstract class Product {

    @prop({ required: true })
    public brand!: string;

    @prop({ required: true })
    public model: string;

    @prop({ required: true, unique: true })
    public barsCode: string;

    @prop({ required: true })
    public type: string

    @prop({ required: true })
    public incomindDate: Date


    protected constructor(brand: string, model: string, barsCode: string, type: string, incomingDate: Date) {
        this.brand = brand
        this.model = model
        this.barsCode = barsCode
        this.type = type
        this.incomindDate = incomingDate
    }



}

