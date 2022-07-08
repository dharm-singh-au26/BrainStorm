
import { getProfile, CreateProfile, profileUpdate} from './repo'

export const profileHandler = async (userData) =>{
    
    const isProfileExist = await getProfile({userId:userData.userId})
    if(isProfileExist && isProfileExist.length){
        return await profileUpdate(userData.userId, userData)

    }else{

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

