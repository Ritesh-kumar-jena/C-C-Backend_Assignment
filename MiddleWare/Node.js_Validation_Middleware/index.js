const express=require("express")
const path=require("path")
const validator=require("./middelware")
const port=3000
const app=express()
 app.use(express.json())

app.post("/",validator,(req,res)=>{
    
    res.status(200).send("data received")
})





app.listen(port,()=>{
    console.log(`server is running on port: ${port}`)
})