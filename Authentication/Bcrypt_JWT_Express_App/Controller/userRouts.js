const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {userModel, blackListing}=require("../Model/userModel")
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

userRout.post("/login",async(req,res)=>{
    try {
        const {email,pass}=req.body
        const user=await userModel.findOne({email})
        if(user){
               bcrypt.compare(pass,user.pass,function(err,result){
                   if(result){
                    const token=jwt.sign({email:user.email,userName:user.userName},process.env.key,{expiresIn:"1h"})
                    const reftoken=jwt.sign({email:user.email,userName:user.userName},process.env.key,{expiresIn:"1d"})
                    res.status(200).send({msg:"login successfull",token:token,reftoken:reftoken})
                   }else{
                    res.status(200).send("Wrong password")
                   }

               })
        }
        else{
            res.status(200).send("Wrong Email plz use register email")
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

userRout.get("/logout",async(req,res)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1]
       const  reftoken=req.headers.refreshtoken
       if(token){
           const blocktoken=new blackListing({token})
          await blocktoken.save()
          if(reftoken){
            const blockreftoken=new blackListing({reftoken})
          await blockreftoken.save()
          }
          res.status(200).send("logout successfull")
       }
       else{
        res.status(400).send("plz login first")
       }
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports={userRout}