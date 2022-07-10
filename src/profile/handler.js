
import { getProfile, CreateProfile, profileUpdate} from './repo'
import { s3Bucket } from '../utility/profileupload'


export const profileHandler = async (userData) =>{
    
    const isProfileExist = await getProfile({userId:userData.userId})

    if(isProfileExist && isProfileExist.length){
        try {
            await s3Bucket.upload({
                Bucket: 'brainstorm06',
                Key: `${Date.now()}_${userData.file.originalname}`,
                Body: userData.file.buffer,
                ACL: 'public-read'
            }, async (err, result) => {
                if(err) return { status: 'failed', message: err.message }
                const userInfo = {
                    phone: userData.phone,
                    address: userData.address,
                    pincode: userData.pincode,
                    district: userData.district,
                    state: userData.state,
                    country: userData.country,
                    image: result.Location
                }
                return await profileUpdate(userData.userId, userInfo)
            }) 
        } catch (error) {
            console.log(error)
        }
    }else {
        return await CreateProfile(userData);
    }
    
 
    
    // const { phone,address,pincode,district,state,country, userId }  = userData;
    // const addDetails = {
    //     userId : userId,
    //     phone : phone,
    //     address : address,
    //     pincode: pincode,
    //     district : district,
    //     state : state,
    //     country : country
        
    // }
    // const saveDetailsInDb = await profileComplete(addDetails);
    // return saveDetailsInDb

}


export const getUserProfile = async (userId) => {
    return await getProfile({userId})
}