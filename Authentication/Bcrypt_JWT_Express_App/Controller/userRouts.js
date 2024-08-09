const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {userModel}=require("../Model/userModel")
const userRout=express.Router()

userRout.post("/register",async(req,res)=>{
    try {
        const {email,userName,pass,age}=req.body
    const user=await userModel.findOne({email})
    if(user){
        res.status(200).send({msg:"user allready registered plz register new email" })
    }
    else{
        bcrypt.hash(pass,5,async function(err,hash){
            if(err){
                res.status(200).send({error:err })
            }
            else{
                const newUser=new userModel({email,userName,pass:hash,age})
                await newUser.save()
               res.status(200).send({msg:"user registered successfully",user:newUser })
            }
        })
    }
    } catch (error) {
        res.status(400).send(error)
    }
    
})





module.exports={userRout}