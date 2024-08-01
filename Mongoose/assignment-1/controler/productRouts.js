const express=require("express")
const { productModel } = require("../Model/model")
const productRouts=express.Router()

productRouts.get("/products",async(req,res)=>{
    try {
        const data=await productModel.find()
        res.status(200).send({product:data})
    } catch (error) {
        res.status(400).send(error)
    }
})

productRouts.post("/addProduct",async(req,res)=>{
    try {
      const data=req.body
      const product=new productModel(data)
      await product.save()
      res.status(200).send({msg:"product added successfully",products:product})
    } catch (error) {
        res.status(400).send(error)
    }
})

productRouts.patch("/update/:id",async(req,res)=>{
    try {
        const data=req.body
        const {id}=req.params
        await productModel.findByIdAndUpdate({_id:id},data)
        res.status(200).send("product detalis has been updated")
    } catch (error) {
        res.status(400).send(error)
    }
})

productRouts.delete("/delete/:id",async(req,res)=>{
    try {
        const {id}=req.params
        await productModel.findByIdAndDelete({_id:id})
        res.status(200).send("product has been deleted")
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports={productRouts}