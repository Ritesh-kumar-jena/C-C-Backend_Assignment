const {userModel}=require("../Model/model")
const auth=async(req,res,next)=>{
    const {name,email,age,password}=req.body
    try {
        const userData=await userModel.findOne({email})
         if(userData){
            res.status(200).send("The user already exist plz enter another email")
         }
         else{
            next()
         }
    } catch (error) {
        res.status(400).send(error)
    }
}
module.exports={auth}