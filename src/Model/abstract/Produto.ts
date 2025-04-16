import { prop } from "@typegoose/typegoose";
//typegoose é uma biblioteca que permite automatizarmos o processo de criação de collection,
//com ele podemos adicionar as propriedades diretamente em uma classe, e a partir daí ele faz 
//o map com a estruturação do schema. 

export default abstract class Produto {

    @prop({required: true})
    public marca!: string;

    @prop({required: true})
    public modelo: string;

    @prop({required: true, unique: true})
    public codigoDeBarras: string;

    @prop({required: true})
    public tipo: string




    protected constructor(marca: string, modelo: string, codigoDeBarras: string, tipo: string) {
        this.marca = marca
        this.codigoDeBarras = codigoDeBarras
        this.modelo = modelo
        this.tipo = tipo
    }

  

}

