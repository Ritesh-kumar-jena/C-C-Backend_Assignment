const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv").config()

const auth=(req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1]
        if(token){
              jwt.verify(token,process.env.key,async(err,decoded)=>{
                if(decoded){  
                    next()
                }
                else{
                    res.status(200).send("Plz login first")
                }
              })
        }else{
            res.status(400).send("Plz login first")
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports={auth}