import {User , Otp} from '../../db'

export const getUser = async (userData) => {
    return await User.find({...userData})  
}

export const createUser = async (user) =>{
    return await User.create(user)
}

export const updateUser = async(id,user) =>{
    const result = await User.findByIdAndUpdate(id,user)
    return result
}

export const saveOtpInDb = async (otpData) => {
    return await Otp.create(otpData)
}

export const getLatestOtp = async(otpData) => {
    return await Otp.find({...otpData}).sort({"createdAt": -1}).limit(1)
}


