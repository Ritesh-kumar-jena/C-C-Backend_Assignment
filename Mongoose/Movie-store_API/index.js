const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const {connection}=require("./db")
const {movieRout}=require("./Controller/movieRouts")

const port=process.env.port

const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).send("hello world")
})

app.use("/movie",movieRout)


app.listen(port,async()=>{
    try {
        await connection
        console.log(`server is running on port:-${port} and connected to data base`)
    } catch (error) {
       console.log(error) 
    }
})