const fs=require("fs")
const path=require("path")
const morgan=require("morgan")
const express=require("express")
const port=3000


const app=express()

app.use(express.json())
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan(':method :status :res[content-length] - :response-time ms :date[clf] HTTP/:http-version :url', { stream: accessLogStream }));
app.get("/",(req,res)=>{
    
    res.status(200).send("<h1>Welcome to User Library</h1>")
})

app.get("/get-users",(req,res)=>{
    const data= JSON.parse(fs.readFileSync('db.json',{encoding:"utf-8"}))
    res.status(200).send(data.users)
})

app.post("/add-user",(req,res)=>{
    let{id,...rest}=req.body
    id=Math.floor(Math.random()*1000)
    const data=JSON.parse(fs.readFileSync('db.json',{encoding:"utf-8"}))
    data.users.push({id,...rest})
    const newData=JSON.stringify(data,null,2)
    fs.writeFileSync("db.json",newData)
    res.status(201).send("User data enter successfully")
})

app.put("/user/:id",(req,res)=>{
    const {id}=req.params
    const UpdateData=req.body
    const data=JSON.parse(fs.readFileSync('db.json',{encoding:"utf-8"}))
    
    const userIndex = data.users.findIndex(user => user.id === +id);
    if(userIndex === -1){
        
        res.status(201).send("User not found")
    }
    else{
        data.users[userIndex]={...data.users[userIndex],...UpdateData}
        fs.writeFileSync("db.json",JSON.stringify(data,null,2))
        res.status(201).send("User data successfully updated ")
    }
})

app.delete("/user/:id",(req,res)=>{
    const {id}=req.params
    const data=JSON.parse(fs.readFileSync('db.json',{encoding:"utf-8"}))
    const userIndex = data.users.findIndex(user => user.id === +id);
    if(userIndex === -1){
        
        res.status(201).send("User not found")
    }
    else{
        data.users.splice(userIndex,1)
        fs.writeFileSync("db.json",JSON.stringify(data,null,2))
        res.status(201).send("User data successfully deleted ")
    }
})


app.listen(port,()=>{
    console.log(`server running on port: ${port}`)
})