import { getModelForClass, prop } from "@typegoose/typegoose";

 class Usuario{

    @prop({required: true})
    public email: string

    @prop({required: true})
    public senha: string


    constructor(email: string, senha: string){
        this.email = email
        this.senha = senha
    }
}

const Usuario_MongoDB_Model = getModelForClass(Usuario)

export {Usuario, Usuario_MongoDB_Model}