
const permissionAuth=(permitedRoles)=>{
    return (req,res,next)=>{
      const  userRole=req.users.role
        if(permitedRoles.includes(userRole)){
            next()
        }else{
            res.status(400).send("Your not allowed to access this route")
        }
    }
}

module.exports={permissionAuth}