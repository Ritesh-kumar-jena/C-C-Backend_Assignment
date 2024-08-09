const dotenv=require("dotenv").config()
const express=require("express")
const port=process.env.port
const {connection}=require("./db")
const { taskRout } = require("./Controller/taskRouts")
const { userRout } = require("./Controller/userRouts")

const app=express()

app.use(express.json())


app.get("/",(req,res)=>{
   res.send("Wellcom to Express App")
})

app.use("/user",userRout)
app.use("/task",taskRout)

app.listen(port,async()=>{
    try {
        await connection
        console.log(`server running on port:-${port} and connected to data base`)
    } catch (error) {
        console.log(error)
    }
})

