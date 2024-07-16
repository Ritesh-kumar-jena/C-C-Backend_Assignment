const fs=require("fs")
const path=require("path")
const validator=(req,res,next)=>{
 const {ID,Name,Rating,Description,Genre,Cast}=req.body
 var flag=true
 const timestamp = Date.now();
 const date = new Date(timestamp)

//  use flag to cheack valid request body
 if(!ID||!Name||!Rating||!Description||!Genre||!Cast){
    flag=false
 }

 if(flag===true){

   if(typeof ID==="number"){

    if(typeof Name==="string"){

        if(typeof Rating==="number"){

            if(typeof Description==="string"){

                if(typeof Genre==="string"){

                    if(Array.isArray(Cast)&&Cast.every(c => typeof c === 'string')){

                        next()
                    }
                    else{
                        res.status(400).send("bad request. some data is incorrect.--->Cast must be an array of strings.")
                        fs.appendFileSync("res.txt",`\n${date}--->Cast must be an array of strings.`)
                       }

                    }
                    else{
                        res.status(400).send("bad request. some data is incorrect.--->Genre must be an strings.")
                        fs.appendFileSync("res.txt",`\n${date}--->Genre must be an strings.`)
                       }

                }
                else{
                    res.status(400).send("bad request. some data is incorrect.--->Description must be an strings.")
                    fs.appendFileSync("res.txt",`\n${date}--->Description must be an strings.`)
                   }

            }
            else{
                res.status(400).send("bad request. some data is incorrect.--->Rating must be an number.")
                fs.appendFileSync("res.txt",`\n${date}--->Rating must be an number.`)
               }

        }
        else{
            res.status(400).send("bad request. some data is incorrect.--->Name must be an strings.")
            fs.appendFileSync("res.txt",`\n${date}--->Name must be an array of strings.`)
           }

    }
    else{
        res.status(400).send("bad request. some data is incorrect.--->ID must be an number.")
        fs.appendFileSync("res.txt",`\n${date}--->ID must be an number.`)
       }

}
else{
    res.send("invalid request body.")
}

}

module.exports=validator