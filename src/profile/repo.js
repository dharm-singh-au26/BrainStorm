
import {Profile} from '../../db'

export const CreateProfile = async (userData) => {
    return await Profile.create(userData)
}

export const getProfile = async (userData) => {
    return await Profile.aggregate([
        {
            $match: {
                userId: userData.userId
            }
        },
        {
            $project: { 
                "userObjId": { $toObjectId: "$userId" }, 
                "phone": 1,
                "address": 1,
                "pincode": 1,
                "district": 1,
                "state": 1,
                "country": 1
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userObjId',
                foreignField: '_id',
                as: 'userData'
            }
        },
        {
            $project: {
                "userObjId": 1, 
                "phone": 1,
                "address": 1,
                "pincode": 1,
                "district": 1,
                "state": 1,
                "country": 1,
                "userData.email": 1,
                "userData.name": 1
            }
        }
    ])
}

export const profileUpdate = async (userId,profileData) => {
    return await Profile.findOneAndUpdate(userId,profileData)
}

