const express=require("express")
const userRouts=express.Router()
const {userModel}=require("../Model/model")
const {auth}=require("../middelware/auth")

userRouts.get("/users",async(req,res)=>{
   try {
      const userData=await userModel.find()
      res.status(200).send({users:userData})
   } catch (error) {
      res.status(400).send(error)
   }
})

userRouts.post("/login",auth,async(req,res)=>{
 const data  =req.body
 try {
    const user= new userModel(data)
   await user.save()
    res.status(200).send({massage:"user details uploaded",user:user})
 } catch (error) {
    res.status(500).send(error)
 }
 
})

userRouts.patch("/updateUser/:id",async(req,res)=>{
   try {
      const {id}=req.params
      const data=req.body
      await userModel.findByIdAndUpdate({_id:id},data)
      res.status(200).send({msg:"user details has been updated"})
   } catch (error) {
      res.status(500).send(error)
 
   }
})

userRouts.delete("/deleteUser/:id",async(req,res)=>{
           try {
            const {id}=req.params
            await userModel.findByIdAndDelete({_id:id})
            res.status(200).send({msg:"user has been deleted"})
           } catch (error) {
            res.status(500).send(error)
           }
})





module.exports={userRouts}