import mongoose from "mongoose";

const Schema = new mongoose.Schema();

export const UserSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true, 
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        require:true,
    },
    roles:[{
        type:String,
        enum: ['user','admin'],
        default: 'user'
    }]

},
{
    timestamps : {
        createdAt: true,
        updatedAt:true
    }
})

