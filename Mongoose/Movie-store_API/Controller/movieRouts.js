const mongoose=require("mongoose")
const express=require("express")
const movieRout=express.Router()
const {MovieModel}=require("../Model/movieModel")

movieRout.get("/",async(req,res)=>{
    try {
        const data=await MovieModel.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({error:error})   
     }
})

movieRout.get("/movies",async(req,res)=>{
    try {
        const {q}=req.query
        const data=await MovieModel.find({title:{$regex:q,$options:"i"}})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({error:error}) 
    }
})

movieRout.get("/movieGenre",async(req,res)=>{
    try {
        const {q}=req.query
        const data=await MovieModel.find({genre:{$regex:q,$options:"i"}})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({error:error})
    }
})

movieRout.get("/movieRating",async(req,res)=>{
    try {
        const {q}=req.query
        const rating=Number(q)
        const data=await MovieModel.find({$and:[{rating:{$gte:rating}},{rating:{$lt:rating+1}}]})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({error:error})
    }
})

movieRout.get("/movieSort",async(req,res)=>{
    try {
        const {year="asc"}=req.query
        const sortBy=year==="desc"?-1:1
        
        const data=await MovieModel.find().sort({year_of_release:sortBy})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({error:error})
    }
})

movieRout.get("/moviePage",async(req,res)=>{
    try {
        const {page=1}=req.query
        const limit=10
        const skip=(page-1)*limit
        const data=await MovieModel.find().skip(skip).limit(limit)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({error:error})
    }
})

movieRout.post("/movieAdd",async(req,res)=>{
    try {
        const data=req.body
        const movie=new MovieModel(data)
        await movie.save()
        res.status(200).send({msg:"movie added successfully"})
    } catch (error) {
        res.status(400).send({error:error})
    }
})

movieRout.patch("/movieUpdate/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const data=req.body
        await MovieModel.findByIdAndUpdate({_id:id},data)
        res.status(200).send({msg:"movie update successfully"})
    } catch (error) {
        res.status(400).send({error:error})
    }
})

movieRout.delete("/movieDelete/:id",async(req,res)=>{
    try {
        const {id}=req.params
        await MovieModel.findByIdAndDelete({_id:id})
        res.status(200).send({msg:"movie delete successfully"})
    } catch (error) {
        res.status(400).send({error:error})
    }
})

module.exports={movieRout}