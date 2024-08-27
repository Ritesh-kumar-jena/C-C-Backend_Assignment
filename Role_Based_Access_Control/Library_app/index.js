const dotenv=require("dotenv").config()
const jwt=require("jsonwebtoken")
const mongoose=require("mongoose")
const express=require("express")
const {connection}=require("./db")
const { userRouts } = require("./Controller/userRouts")
const { libraryRouts } = require("./Controller/libraryRouts")
const { blackListing } = require("./Model/userModel")
const morgan = require("morgan")
const fs=require("fs")
const path=require("path")


const port=process.env.port

const app=express()

app.use(express.json())

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan(':method :status :res[content-length] - :response-time ms :date[clf] HTTP/:http-version :url', { stream: accessLogStream }));

app.get("/",(req,res)=>{
    res.status(200).send("welcom to Library app")
})

app.get("/newToken",async(req,res)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1]
        const reftoken=req.headers.refreshtoken
        if(reftoken){
            if(token){
                const blocked=await blackListing.findOne({reftoken})
                if(blocked){
                    res.status(400).send("plz login first")
                }else{
                    jwt.verify(reftoken,process.env.key,async(err,decoded)=>{
                        if(decoded){
                            const blacklisted=await blackListing.findOne({token})
                            if (blacklisted){
                                const newToken=jwt.sign({id:decoded.id},process.env.key,{expiresIn:"1h"})
                              return  res.status(200).send({token:newToken,reftoken:reftoken})
                            }else{
                                const oldToken=new blackListing({token})
                                await oldToken.save()
                                const newToken=jwt.sign({id:decoded.id},process.env.key,{expiresIn:"1h"})
                                res.status(200).send({token:newToken,reftoken:reftoken})
                            }
                           
                        }else{
                            res.status(200).send("plz login first")
                        }
                    })
                }
            }
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

app.use("/user",userRouts)
app.use("/book",libraryRouts)

app.listen(port,async()=>{
    try {
        await connection
        console.log(`server running on port-:${port} and connected to data base`)
    } catch (error) {
        console.log(error)
    }
})