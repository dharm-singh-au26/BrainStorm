import mongoose from "mongoose";

const Schema = new mongoose.Schema();

export const OtpSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
    },
    otp : {
        type : Number,
        required : true,
    }
  
},
{
    timestamps : {
        createdAt: true,
        updatedAt:true,
    }
}
)
