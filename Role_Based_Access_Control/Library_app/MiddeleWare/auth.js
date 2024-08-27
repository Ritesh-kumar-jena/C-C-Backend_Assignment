const dotenv=require("dotenv").config()
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const { blackListing, userModel } = require("../Model/userModel")


const auth=async(req,res,next)=>{
    try {
        if(req.headers.authorization){
            const token=req.headers.authorization?.split(" ")[1]
            if(token){
                const blacklisted=await blackListing.findOne({token})
                if(blacklisted){
                    res.status(200).send("plz login first")
                }
                else{
                   jwt.verify(token,process.env.key,async(err,decoded)=>{
                       if(decoded){
                          const userId=decoded.id
                          const user=await userModel.findOne({_id:userId})
                          req.users=user
                        next()
                       }else{
                        res.status(400).send("plz login first")
                       }
                   })
                }
            }else{
                res.status(400).send("Token missing plz login first")
            }
        }else{
            res.status(400).send("Token missing")
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports={auth}