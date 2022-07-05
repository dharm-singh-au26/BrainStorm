import { getUser , createUser , saveOtpInDb,getLatestOtp,updateUser } from "./repo";
import {User} from '../../db'
import bcrypt, { hash } from 'bcrypt';
import { generateToken } from './jwtToken'
import { emailSender } from "../utility/mailer";

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

export const forgotPasswordHandler = async (userData) => {
    const  {email} = userData
       const existingUser = await getUser({email})
       if(existingUser){
        const otp = Math.floor(100000 + Math.random() * 900000);

        const saveOtp = await saveOtpInDb({userId : existingUser[0]._id ,otp});

        return await emailSender(email, `Here is your OTP to reset your password ${otp}`)


    }
}

export const otpConfirmation = async (otpData) => {
    const {otp ,userId , password , confirmPassword} = otpData ;

    const dbOtp = await getLatestOtp({userId})
    const isOtpValid = dbOtp && dbOtp[0] && dbOtp[0].otp == otp ;
    return isOtpValid 
}

export const updatePassword = async(userData) => {
    const {userId,password} = userData;

    const saltRounds = 10;
     
    const hash = await bcrypt.hash(password, saltRounds)

    const updatedUser = {
        userId : userId,
        password: hash

    }
    const savePassword = await updateUser(updatedUser.userId, { password: updatedUser.password })
    return savePassword



}