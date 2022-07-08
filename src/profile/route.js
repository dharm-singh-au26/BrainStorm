import  express  from "express";
import { profileHandler } from "./handler";
import { validateJwtToken } from '../User/jwtToken'


const Router = express.Router();

Router.get('/userinfo/:userId', validateJwtToken(['admin', 'user']), async (req,res) => {

    const {phone,address,pincode,district,state,country,profileImage }  = req.body;
    const userId = req.params.userId;


    const fillDetails = await  profileHandler({phone,address,pincode,district,state,country, userId });

    if(fillDetails){
        res.send(
            {
                message : 'Detail saved Successfully',
                data : fillDetails
            }
        )
    
    }else{
        res.send({
            message: 'something went wrong'

        })
    }


})

export const ProfileRoute = Router;