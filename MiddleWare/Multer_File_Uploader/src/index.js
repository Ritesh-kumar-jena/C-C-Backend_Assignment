// import require module

const path=require("path")
const express=require("express")
const multer=require("multer")

const port=8080

const app=express()

app.use(express.json())

// take a variable name storage to set the destination where file will get store and what is the name of that file have.
const storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'uploads/')
    },
 filename:function(req,file,cb){
   cb(null,file.originalname)
 },

})

// set the storage 
const uploaded=multer({storage:storage})

// create a home rout where we send the file as response to open our html file 
app.get("/",(req,res)=>{
    res.status(200).sendFile(__dirname+"/index.html")
})

// create a upload rout where it take any file type and save in our folder and give a response massage with the file path
app.post("/upload",uploaded.single('avatar'),(req,res)=>{
 res.status(200).send({
    "message": "file uploaded successfully",
    "imageUrl" : req.file.path 
   })  
})

app.listen(port,()=>{
    console.log(`server is running on port: ${port}`)
})





