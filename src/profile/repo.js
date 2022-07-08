import {Profile} from '../../db'

export const CreateProfile = async (userData) => {
    return await Profile.create(userData)
}

export const getProfile = async (userData) => {
    return await Profile.find(userData)
}

export const profileUpdate = async (userId,profileData) => {
    return await Profile.findOneAndUpdate(userId,profileData)
}

export const uploadImage = async (userData) => {
    return 
}