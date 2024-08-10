const jwt=require("jsonwebtoken")
const { blackListing } = require("../Model/userModel")
const dotenv=require("dotenv").config()


const auth=async(req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1]
        if(token){
           const blocked=await blackListing.findOne({token})
           if(blocked){
            res.status(200).send("login first")
           }else{
            jwt.verify(token,process.env.key,(err,decoded)=>{
                if(decoded){
                    next()
                }else{
                    res.status(200).send("login first")
                }
            })
           }
        }else{
            res.status(200).send("token missing plz login first")
        }
    } catch (error) {
        res.status(400).send(error)
    }
    
}

module.exports={auth}