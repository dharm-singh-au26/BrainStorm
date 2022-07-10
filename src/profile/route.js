import  express  from "express";
import { profileHandler, getUserProfile } from "./handler";
import { validateJwtToken } from '../User/jwtToken'
import { upload } from '../utility/profileupload'

const Router = express.Router();

Router.post('/userinfo/:userId', validateJwtToken(['admin', 'user']), upload, async (req, res) => {
    const { file } = req;
    const {phone,address,pincode,district,state,country,image}  = req.body;
    const userId = req.params.userId;
    const fillDetails = await  profileHandler({phone,address,pincode,district,state,country, userId, file});

    if(fillDetails){ 
        res.send({
                message : 'Detail saved Successfully',
                data : fillDetails
            })
    }else{
        res.send({
            message: 'something went wrong'

        })
    }
})

Router.get('/get-user-info/:userId', async (req, res) => {
    const { userId } = req.params;
    const result = await getUserProfile(userId)
    if(!!result.length) res.send(result)
    else {
        res.send({
            message: 'something went wrong'
        })
    }
})

export const ProfileRoute = Router;