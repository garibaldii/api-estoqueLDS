import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Usuario, Usuario_MongoDB_Model } from '../Model/Usuario';
import { HttpError } from '../Utils/HttpError';
import { usuarioCadastrado } from './Usuario';


export const login = async (email: string, senha: string) => {

    const usuario = await usuarioCadastrado(email)

    if (!usuario) {
        throw new HttpError(
            `Usuário não encontrado`,
            404
        )
    }

    const senhaConfere = await bcrypt.compare(senha, usuario.senha)

    if (!senhaConfere) {
        throw new HttpError(
            `Senha incorreta`,
            401
        )
    }

    const token = jwt.sign(
        { id: usuario._id },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: "5h" }
    )

    console.log(token)

    return token

}

export const registro = async (email: string, senha: string) => {

    if (await usuarioCadastrado(email)) {
        throw new HttpError(
            `Usuário já cadastrado`,
            400
        )
    }
    console.log(senha)

    const hash = await bcrypt.hash(senha, 10)
    
    console.log(hash)

    const novoUsuario = new Usuario(email, hash)
    return await Usuario_MongoDB_Model.create(novoUsuario)

}