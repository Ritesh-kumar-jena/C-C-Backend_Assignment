const express=require("express")
const mongoose=require("mongoose")
const { auth } = require("../MiddeleWare/auth")
const { bookModel } = require("../Model/bookModel")
const { permissionAuth } = require("../MiddeleWare/libraryAuth")
const libraryRouts=express.Router()

libraryRouts.use(auth)

libraryRouts.get("/books",permissionAuth(["VIEWER","CREATOR","VIEW_ALL"]),async(req,res)=>{
    try {
        const {old,new:isNew}=req.query
        let Book;
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)
        const authorRole=req.users.role
        const author=req.users
        if(authorRole==="VIEWER"){
            const myBooks=await bookModel.find({"createdBy._id":author._id})
         if(myBooks.length>0){
            if(old==="1"){
                Book=myBooks.filter(book=>book.createdAt<tenMinutesAgo)
             return   res.status(200).send({book:Book})
            }
            else if(isNew==="1"){
                Book=myBooks.filter(book=>book.createdAt>tenMinutesAgo)
                if(Book.length>0){
                    return   res.status(200).send({book:Book})
                }else{
                    return   res.status(200).send("We don't have any recent collection of your's")
                }
            }
            res.status(200).send({book:myBooks})
        }
       else{
        res.status(200).send("Currently your books collections is not in our library")
       }
        }else{
            const books=await bookModel.find()
            if(old==="1"){
                Book=books.filter(book=>book.createdAt<tenMinutesAgo)
             return   res.status(200).send({book:Book})
            }
            else if(isNew==="1"){
                Book=books.filter(book=>book.createdAt>tenMinutesAgo)
                if(Book.length>0){
                    return   res.status(200).send({book:Book})
                }else{
                    return   res.status(200).send("We don't have any recent collection.")
                }
            }
            res.status(200).send({book:books})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

libraryRouts.get("/myBooks",permissionAuth(["VIEWER"]),async(req,res)=>{
    try {
        const author=req.users
        const books=await bookModel.find({"createdBy._id":author._id})
        if(books.length>0){
            res.status(200).send({book:books})
        }
       else{
        res.status(200).send("Currently your books collections is not in our library")
       }
    } catch (error) {
        res.status(400).send(error)
    }
})

libraryRouts.post("/addBook",permissionAuth(["VIEWER","CREATOR"]),async(req,res)=>{
    try {
        const writeDetalis=req.users
        const {name,price,createdAt}=req.body
        const author=writeDetalis.userName
        const book= new bookModel({name,author,price,createdAt,createdBy:writeDetalis})
        book.save()
        res.status(200).send({msg:"New book add to the library",book:book})
    } catch (error) {
        res.status(400).send(error)
    }
})

libraryRouts.patch("/updateBook/:id",permissionAuth(["CREATOR"]),async(req,res)=>{
    try {
        const {id}=req.params
        const data=req.body
        await bookModel.findByIdAndUpdate({_id:id},data)
        res.status(200).send({msg:"Book updated successfully"})
    } catch (error) {
        res.status(400).send(error)
    }
})


libraryRouts.delete("/deleteBook/:id",permissionAuth(["CREATOR"]),async(req,res)=>{
    try {
        const {id}=req.params
        await bookModel.findByIdAndDelete({_id:id})
        res.status(200).send({msg:"Book deleted successfully"})
    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports={libraryRouts}