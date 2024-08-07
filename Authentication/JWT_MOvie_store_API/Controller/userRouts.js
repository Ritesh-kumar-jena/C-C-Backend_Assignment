const express=require("express")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv").config()
const mongoose=require("mongoose")
const {userModel}=require("../Model/userModel")
const userRout=express.Router()

userRout.get("/",async(req,res)=>{
    try {
        const user=await userModel.find()
        res.status(200).send({users:user})
    } catch (error) {
        res.status(200).send(error)
    }
})

userRout.post("/register",async(req,res)=>{
    try {
        const data=req.body
        const user=await userModel.findOne({email:data.email})
        if(user){
          res.status(200).send({msg:"This user allready register plz try another email id"})
        }else{
            const newUser=new userModel(data)
            await newUser.save()
            res.status(200).send({msg:"user register successfully",user:newUser})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

userRout.post("/login",async(req,res)=>{
    try {
        const {email,pass}=req.body
        const user=await userModel.findOne({email,pass})
        if(user){
           const token=jwt.sign({userName:user.userName,email:user.email},process.env.key,{expiresIn:"1h"})
           res.status(200).send({msg:"login successfull",token:token})
        }else{
            res.status(200).send({msg:"Wrong email/password plz register first"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports={userRout}