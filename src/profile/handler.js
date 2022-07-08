
import { getProfile, CreateProfile, profileUpdate} from './repo'
import { S3Client } from '../utility/profileupload'


export const profileHandler = async (userData) =>{
    
    const isProfileExist = await getProfile({userId:userData.userId})

    if(isProfileExist && isProfileExist.length){
        const uploader = await S3Client.uploadFile(userData.file, userData.fileName)
        return await profileUpdate(userData.userId, userData)
    }else
    {

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

