import express from "express";
import { loginHandler, signUpHandler } from "./handler";
import {validateSignUp ,validateLogin} from '../validations/userValidation'
import { isEmpty } from "../validations/isEmpty";
import { validateJwtToken } from './jwtToken'
const Router = express.Router();

Router.post('/login', async (req, res) => {
    try {
        const {email,password} = req.body;
        const isError = validateLogin({email,password});
        if(isEmpty(isError)){
        const result = await loginHandler({email,password})
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

export const UserRoute = Router;