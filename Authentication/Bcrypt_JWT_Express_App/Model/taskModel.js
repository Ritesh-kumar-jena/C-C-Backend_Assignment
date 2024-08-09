const mongoose=require("mongoose")

const taskSchema=mongoose.Schema({
    title:{type:String,required:true},
    task:{type:String,required:true},
    complete:{type:Boolean,required:true}

}, {versionKey:false})

const taskModel=mongoose.model("task",taskSchema)

module.exports={taskModel}