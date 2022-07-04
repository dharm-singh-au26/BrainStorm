import mongoose from "mongoose";
import { UserSchema} from "./src/model/User";

const connection = mongoose.createConnection('mongodb://localhost:27017/BrainStorm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('DataBase Is Connected')
})

const User = connection.model('users',UserSchema)


export {
    User
}