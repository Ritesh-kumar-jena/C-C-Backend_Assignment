// import required module like (fs & path)
const fs=require("fs")
const path=require("path")

//   use process.argv for catch our input in terminal 
const operation=process.argv[2]
const  file=process.argv[3]
const content=process.argv[4]

// use switch case to perform operation
switch (operation) {
    case "read":{
    //  for read file
        fs.readFile(`${file}`,{encoding:"utf-8"},(err,data)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log(data)
            }
            
        })
        break;
        
    }

    case "append":{
       //  for append file 
        fs.appendFile(`${file}`,`\n${content}`,(err)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log(`Content appended to the file ${file}`)
            }
        })
        
        break;
    }

    case "delete":{
       //  for delete file
        fs.unlink(`${file}`,(err)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log(`File ${file} deleted`)
            }
        })
        
        break;
    }

    case "create":{
        //  for create file
        fs.writeFile(`${file}`," ",(err)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log(`File ${file} created`)
            }
        })
        
        break;
    }

    case "rename":{
       //  for rename file
        fs.rename(`${file}`,`${content}`,(err)=>{
            if(err){
               console.log(err)
            }
        else{
            console.log(`File ${file} renamed to ${content}`)
        }
        })
        
        break;
    }

    case "list":{
      //  for show List of all files and directories in current dir
        fs.readdir(__dirname,(err,files)=>{
            if(err){
                console.log(err)
            }
            else{
                files.forEach((ele)=>{
                    console.log(ele)
                })
            }
        })
        
        break;
    }
        
       

    default:
        console.log("`Invalid operation '${operation}'`")
        break;
}