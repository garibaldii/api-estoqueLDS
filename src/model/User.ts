import { getModelForClass, prop } from "@typegoose/typegoose";

class User {

    @prop({ required: true })
    public name: string

    @prop({ required: true })
    public email: string

    @prop({ required: true })
    public password: string


    constructor(name: string, email: string, senha: string) {
        this.name = name
        this.email = email
        this.password = senha
    }
}

const User_MongoDB_Model = getModelForClass(User)

export { User, User_MongoDB_Model}