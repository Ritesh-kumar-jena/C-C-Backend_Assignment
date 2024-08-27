const dotenv=require("dotenv").config()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const express=require("express")
const { userModel, blackListing } = require("../Model/userModel")
const userRouts=express.Router()

userRouts.post("/register",async(req,res)=>{
    try {
        const {email,userName,pass,age,role}=req.body
        const user=await userModel.findOne({email})
        if(user){
            res.status(200).send("User is allready register plz try another email ID")
        }
        else{
            bcrypt.hash(pass,5,async function(err,hash){
                if(err){
                    res.status(400).send({msg:"error while hashing",err})
                }else{
                    const newUser=new userModel({email,userName,pass:hash,age,role})
                    await newUser.save()
                    res.status(200).send(newUser)
                }
            })
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

userRouts.post("/login",async(req,res)=>{
try {
    const {email,pass}=req.body
    const user=await userModel.findOne({email})
    if(user){
         bcrypt.compare(pass,user.pass,function(err,result){
            if(result){
         const token=jwt.sign({id:user._id},process.env.key,{expiresIn:"1h"})
         const reftoken=jwt.sign({id:user._id},process.env.key,{expiresIn:"1d"})
         res.status(200).send({msg:"login successfull",token:token,reftoken:reftoken})
            }else{
               res.status(200).send("wrong password")
            }
         })
    }else{
        res.status(400).send("it is not a register email id plz register your details first")
    }
} catch (error) {
    res.status(400).send(error)
}
})

userRouts.get("/logout",async(req,res)=>{
    try {
        if(req.headers.authorization){
            const token=req.headers.authorization?.split(" ")[1]
        const reftoken=req.headers.refreshtoken
        if(token){
            const blacklisted=await blackListing.findOne({token})
            if(blacklisted){
                res.status(200).send("user allready logout")
            }else{
                const blacklistedToken=new blackListing({token})
                blacklistedToken.save()
                if(reftoken){
                    const blacklistedrefToken=await blackListing.findOne({reftoken})
                    if(blacklistedrefToken){
                     return   res.status(200).send("logout successfull")
                    }else{
                        const blacklistedReftoken=new blackListing({reftoken})
                        blacklistedReftoken.save()
                    }  
                }
                res.status(200).send("logout successfull")
            }
        }
        }else{
            res.status(400).send("Token missing")
        }
        
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports={userRouts}