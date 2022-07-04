import validator from 'validator';
import { isEmpty } from './isEmpty';

export const validateSignUp = (data) =>{
    const error = {
    }
    if(data.name=== '')error.name='name is required'
    if(data.email=== '')error.email='email is required'
    if(data.password=== '')error.password='password is required'
    if(data.confirmPassword=== '')error.confirmPassword='confirm Password is required'
    if(data.roles.length==0)error.roles.length='role  is required'

    if(!validator.isEmail(data.email))error.email='email is invalid'
    if(!validator.isLength(data.password,{min:8,max:16}))error.password='password is incorrect'
    if(!validator.equals(data.confirmPassword,data.password))error.confirmPassword='Password is not matching!'
    
    if (isEmpty(error)) {
        return null
        
    }else{
        return error
    }
}


export const validateLogin = (data) =>{
    const error ={

    }
    if(data.email=== '')error.email='Enter Your Email'
    if(data.password=== '')error.password='Enter Password !'

    if(!validator.isEmail(data.email))error.email='email is invalid'
    if(!validator.isLength(data.password,{min:8,max:16}))error.password='password is incorrect'

    if (isEmpty(error)) {
        return null
        
    }else{
        return error
    }
    
}
