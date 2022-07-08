import  express  from "express";
import { profileHandler } from "./handler";
import { validateJwtToken } from '../User/jwtToken'
import { upload } from '../utility/profileupload'

const Router = express.Router();

Router.post('/userinfo/:userId', upload.single('image'),validateJwtToken(['admin', 'user']), async (req, res) => {
    console.log(req.file)
    const { file, fileName } = req.file;
    const {phone,address,pincode,district,state,country,image}  = req.body;
    const userId = req.params.userId;
    const fillDetails = await  profileHandler({phone,address,pincode,district,state,country, userId,image, file, fileName});

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

export const ProfileRoute = Router;