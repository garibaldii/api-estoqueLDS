import { Usuario_MongoDB_Model } from "../Model/Usuario"

export const usuarioCadastrado = async (email: string) => {
    return await Usuario_MongoDB_Model.findOne({email})
}