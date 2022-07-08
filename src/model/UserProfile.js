import mongoose  from "mongoose";


export const ProfileSchema  = new mongoose.Schema({

    userId : {
        type : String,
        required : true
    },

    phone: {
        type:Number,
        required: true,
    },
    address:{
        type:String,
        required:true,
    },
    pincode: {
        type:Number,
        required:true,
    },
    district : {
        type:String,
        required:true
    },
    state : {
        type:String,
        required:true
    },
    country : {
        type :String,
        required : true
    },
    image : {
        type : String,
        required : true

    }
})

