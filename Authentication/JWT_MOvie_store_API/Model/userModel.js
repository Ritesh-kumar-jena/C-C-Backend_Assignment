const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    email:{type:String, required:true},
    UserName:{type:String,required:true},
    pass:{type:String,required:true}
},{
    versionKey:false
})
const userModel=mongoose.model("user",userSchema)

module.exports={userModel}