import express from "express";
import { loginHandler, signUpHandler,forgotPasswordHandler,otpConfirmation,updatePassword} from "./handler";
import {validateSignUp ,validateLogin ,validateUpdatedPassword} from '../validations/userValidation'
import { isEmpty } from "../validations/isEmpty";
import { validateJwtToken } from './jwtToken'
import { emailSender } from "../utility/mailer";

const Router = express.Router();

Router.post('/login', async (req, res) => {
    try {
        const {email,password} = req.body;
        const isError = validateLogin({email,password});
        if(isEmpty(isError)){
        const result = await loginHandler({email,password})
        const mailRes = await emailSender(email, 'hello brainstorm')


        res.send(result)
    }else{
        res.send(isError)
    }
    } catch (error) {
        console.log('Login not found')        
    }

})

Router.post('/signup', async (req, res)=>{
    try {
        const { name, email, password, confirmPassword, roles } = req.body;
        const isError = validateSignUp({ name, email, password, confirmPassword, roles} );
        if(isEmpty(isError)){
            const result = await signUpHandler({ name, email, password, confirmPassword, roles } )
            res.send(result)
        }else{
            res.send(isError)
        }
        
    } catch (error) {
       res.send(error)      
    }  
}) 

Router.get('/profile/user',validateJwtToken(['user']),(req,res) => {

   res.send("Only users with role 'user' can access this route")
})

Router.get('/profile/admin', validateJwtToken(['admin']), (req, res) => {
    res.send("Only users with role 'admin' can access this route")
})

Router.get('/profile/all', validateJwtToken(['admin', 'user']), (req, res) => {
    res.send("Users with role both 'admin' and 'user' can access this route")
})

Router.post('/forgotPassword', async (req, res) =>{
    const { email } = req.body;
    const result = await forgotPasswordHandler({email})
    res.send(result)
})

Router.post('/resetPassword',async (req,res) => {
    const {otp , userId ,password , confirmPassword} = req.body ;

    const result = await otpConfirmation({otp , userId ,password , confirmPassword})
    if(result){

        const matchPassword = validateUpdatedPassword({password,confirmPassword})
        if(isEmpty(matchPassword)){

            const passwordReset = await updatePassword({userId ,password })
            res.send(passwordReset)
        }else{
            res.send(matchPassword)
        }
   

    }else{
        res.send({
            message:'otp validation failed plz try again'
        })
    }
})





export const UserRoute = Router;