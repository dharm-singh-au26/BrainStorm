import mongoose from "mongoose";
import { UserSchema} from "./src/model/User";
import { OtpSchema } from "./src/model/Otp";

const connection = mongoose.createConnection('mongodb://localhost:27017/BrainStorm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('DataBase Is Connected')
})

const User = connection.model('users',UserSchema)
const Otp = connection.model('otp',OtpSchema)



export {
    User,
    Otp,
}