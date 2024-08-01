const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    age:{type:Number,required:true},
    password:{type:String,required:true}

},
{versionKey:false})

const userModel=mongoose.model("user",userSchema)

const productSchema=mongoose.Schema({
    name:{type:String,required:true},
    brand:{type:String,required:true},
    catagory:{type:String,required:true},
    colour:{type:String,required:true},
    price:{type:Number,required:true}

},{versionKey:false})

const productModel=mongoose.model("product",productSchema)

module.exports={userModel,productModel}