const express =require("express")
const dotenv=require("dotenv").config()
const {connection}=require("./db")
const {userRouts}=require("./controler/userRouts")
const { productRouts } = require("./controler/productRouts")

const port=process.env.Port
const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).send("Wellcom")
})

app.use("/user",userRouts)

app.use("/product",productRouts)

app.listen(port,async()=>{
    try {
         await connection
        console.log(`server running on port ${port} and connected to database`)
    } catch (error) {
        console.log(error)
    }
    
})