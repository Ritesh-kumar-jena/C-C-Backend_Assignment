const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    email:{type:String,required:true},
    userName:{type:String,required:true},
    pass:{type:String,required:true},
    age:{type:Number,required:true}
},{ versionKey:false})

const userModel=mongoose.model("user",userSchema)

module.exports={userModel}