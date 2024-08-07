const mongoose=require("mongoose")
const movieSchema=mongoose.Schema({
    title:{type:String, required:true},
    year_of_release:{type:Number,required:true},
    genre:{type:String,required:true},
    rating:{type:Number,required:true}
},{
    versionKey:false
})
const MovieModel=mongoose.model("movie",movieSchema)

module.exports={MovieModel}