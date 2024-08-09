const express=require("express")
const mongoose=require("mongoose")
const taskRout=express.Router()
const {taskModel}=require("../Model/taskModel")


taskRout.get("/allTasks",async(req,res)=>{
    try {
        const data=await taskModel.find()
        res.status(200).send({Tasks:data})
    } catch (error) {
        res.status(400).send(error)
    }
})

taskRout.post("/addTasks",async(req,res)=>{
    try {
        const data=req.body
        const task=new taskModel(data)
        await task.save()
        res.status(200).send({msg:"Task added successfully",Task:task})

    } catch (error) {
        res.status(400).send(error)
    }
})

taskRout.patch("/updateTasks/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const data=req.body
        await taskModel.findByIdAndUpdate({_id:id},data)
        res.status(200).send({msg:"Task updated successfully"})
    } catch (error) {
        res.status(400).send(error)
    }
})

taskRout.delete("/deleteTasks/:id",async(req,res)=>{
    try {
        const {id}=req.params
        await taskModel.findByIdAndDelete({_id:id})
        res.status(200).send({msg:"Task deleted successfully"})
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports={taskRout}