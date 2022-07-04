import jwt from "jsonwebtoken";
import { config } from '../../config'
import { getUser } from "./repo";

export const generateToken = (payload) => {
    const myKey = config.JWT_SECRET_KEY;
    return jwt.sign(payload, myKey);
}

export const validateJwtToken = (allowedRoles) => async (req,res,next) =>{
    const token = req.headers.token;
    // console.log(allowedRoles)
    try {
        
        const verify = jwt.verify(token,config.JWT_SECRET_KEY)
        if(verify){
            const userData = await getUser({_id: verify.userId})
            if(userData && userData[0].email === verify.email) {
                const userRoles = userData[0].roles;
                const isAllowed = allowedRoles.some(role => userRoles.includes(role))
                if(isAllowed) next()
                else res.send({
                    message: 'You are not allowed to use this route'
                })
            }
            else res.send({
                message: 'Invalid token'
            })
        }else{
            res.send(
                {
                    message : 'Invalid Token'
                }
            )
        }
    } catch (error) {
        res.send(
            {
                message : 'Invalid Token'
            }
        )
    }


}