import { Usuario_MongoDB_Model } from "../Model/Usuario"

export const usuarioCadastrado = async (email: string) => {
    return await Usuario_MongoDB_Model.findOne({email})
}

export const getUserById = async (id: string) => {
    const user = await Usuario_MongoDB_Model.findById(id)
    console.log(JSON.stringify(user))
    console.log("sendo executado")
    return await Usuario_MongoDB_Model.findById(id)
}