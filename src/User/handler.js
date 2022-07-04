import { getUser , createUser} from "./repo";
import {User} from '../../db'
import bcrypt, { hash } from 'bcrypt';
import { generateToken } from './jwtToken'

export const signUpHandler = async (userData) =>{
    const isEmailExist = await getUser({email: userData.email})
    if(isEmailExist.length) {
        return 'Email already available'    
    }
    else {
        const saltRounds = 10;
     
        const hash = await bcrypt.hash(userData.password, saltRounds)

        const newUser = {
            name : userData.name,
            email : userData.email,
            password: hash,
            roles: userData.roles
        }

        const saveUserInDb = await createUser(newUser)

        return saveUserInDb
        // return 'All ok to signup'
    }
}

export const loginHandler = async (userData) =>{
    const {email,password} = userData
 
    try {
        
       const existingUser = await User.findOne({email});
       if(existingUser){

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
        if(isPasswordCorrect) {
            return {
                message: 'Login success',
                token: generateToken({
                    userId: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    roles: existingUser.roles
                })
            }
        }else{
            return {
                message: 'password is incorrect'
            }
        }
       }else{
        return {
            message: 'user not available'
        }
       }

    } catch (error) {
        return console.log(error)
    }
}