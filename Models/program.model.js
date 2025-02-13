import mongoose from "mongoose";
const programsSchema= new mongoose.Schema({
    program:{
        type: String, 
        required : true
    },
    launched_on:{
        type: Date,
        require: true 
    },
    rewards : {
        type : String,
        enum : ["Bounty"], 
        require : true
    }
})
export const programs = mongoose.model("programs", programsSchema)