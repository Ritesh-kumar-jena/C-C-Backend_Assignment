const mongoose=require("mongoose")

const bookSchma=mongoose.Schema({
    name:{type:String,required:true},
    author:{type:String,required:true},
    price:{type:Number,required:true},
    createdAt:{type:Date,default:Date.now},
    createdBy:{type:Object,require:true}
},{ versionKey:false})


const bookModel=mongoose.model("book",bookSchma)

module.exports={bookModel}

