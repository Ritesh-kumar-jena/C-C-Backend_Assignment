const dotenv=require("dotenv").config()
const express=require("express")
const port=process.env.port
const {connection}=require("./db")
const { taskRout } = require("./Controller/taskRouts")
const { userRout } = require("./Controller/userRouts")
const { auth } = require("./Middelware/auth")
const { blackListing } = require("./Model/userModel")
const jwt=require("jsonwebtoken")

const app=express()

app.use(express.json())


app.get("/",(req,res)=>{
   res.send("Wellcom to Express App")
})

app.get("/newToken",async(req,res)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1]
        const reftoken=req.headers.refreshtoken
        if(reftoken){
           if(token){
              const blocked=await blackListing.findOne({reftoken})
              if(blocked){
                res.status(200).send("plz login first")
              }
              else{
                jwt.verify(reftoken,process.env.key,async(err,decoded)=>{
                    if(decoded){
                        const oldToken=new blackListing({token})
                        await oldToken.save()
                       const newToken=jwt.sign({email:decoded.email,userName:decoded.userName},process.env.key,{expiresIn:"1h"})
                        res.status(200).send({newToken:newToken,reftoken:reftoken})
                    }else{
                        res.status(200).send("plz login first")
                    }
                })

              }

           }else{res.status(400).send("token missing")}
        }else{res.status(400).send("reftoken missing")}
        
    } catch (error) {
        res.status(400).send(error)
    }
})

app.use("/user",userRout)
app.use("/task",auth,taskRout)

app.listen(port,async()=>{
    try {
        await connection
        console.log(`server running on port:-${port} and connected to data base`)
    } catch (error) {
        console.log(error)
    }
})

