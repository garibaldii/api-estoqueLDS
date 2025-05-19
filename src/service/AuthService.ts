import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User, User_MongoDB_Model } from '../model/User';
import { HttpError } from '../utils/HttpError';
import { getUserByEmail } from './UserService';

export const login = async (email: string, password: string) => {

    const user = await getUserByEmail(email)

    if (!user) {
        throw new HttpError(
            `Dados incorretos`,
            404
        )
    }

    const matchesPassword = await bcrypt.compare(password, user.password)

    if (!matchesPassword) {
        throw new HttpError(
            `Senha incorreta`,
            401
        )
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: "5h" }
    )

    console.log(token)

    return token

}

export const signUp = async (name: string, email: string, password: string) => {

    if (await getUserByEmail(email)) {
        throw new HttpError(
            `Usuário já cadastrado`,
            400
        )
    }
    console.log(password)

    const hash = await bcrypt.hash(password, 10)
    
    console.log(hash)

    const novoUsuario = new User(name, email, hash)
    return await User_MongoDB_Model.create(novoUsuario)

}