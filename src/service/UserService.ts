import { User_MongoDB_Model } from "../model/User"

export const getUserByEmail = async (email: string) => {
    return await  User_MongoDB_Model.findOne({email})
}

export const getUserById = async (id: string) => {
    const user = await  User_MongoDB_Model.findById(id)
    console.log(JSON.stringify(user))
    console.log("sendo executado")
    return await  User_MongoDB_Model.findById(id)
}