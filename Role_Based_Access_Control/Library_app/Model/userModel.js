const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    email:{type:String,required:true},
    userName:{type:String,required:true},
    pass:{type:String,required:true},
    age:{type:Number,required:true},
    role:{
        type:String,
        required:true,
        default:"VIEW_ALL",
        enum:["VIEWER","CREATOR","VIEW_ALL"]

    }
},{ versionKey:false})

const userModel=mongoose.model("user",userSchema)

const blackListingSchema=mongoose.Schema({
    token:{type:String},
    reftoken:{type:String}
},{ versionKey:false})

const blackListing=mongoose.model("blacklistedToken",blackListingSchema)

module.exports={userModel,blackListing}