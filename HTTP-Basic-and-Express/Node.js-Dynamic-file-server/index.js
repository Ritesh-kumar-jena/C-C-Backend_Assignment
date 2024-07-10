// import required modules 
const http=require("http")
// difine port number
const port=3000
const path=require("path")
const fs=require("fs")
// creat a server
const server=http.createServer((req,res)=>{
    // catch the url from request
    const isURL=req.url
    // join the path of url useing path.join(),process.cwd() give curent working directory(C:\Users\jenar\OneDrive\Desktop\C-C-Backend_Assignment\HTTP-Basic-and-Express\Node.js-Dynamic-file-server)
    console.log(isURL)
    const requirePath=path.join(process.cwd(),isURL)

    // use fs.stat() to check file/directory is exist in given path
    fs.stat(requirePath,(err,data)=>{
     if(err){
        res.writeHead(404,{"content-type":"text/plain"})
        res.end("404 not found")
     }
     else{
        // if the data type is file show the file data in UI
        if(data.isFile()){
           fs.readFile(requirePath,{encoding:"utf-8"},(err,fileData)=>{
            if(err){
                res.writeHead(404,{"content-type":"text/plain"})
                res.end("404 File can't read")
            }
            else{
                res.writeHead(200,{"content-type":"text/plain"})
                res.write(fileData)
                res.end()
            }
           })
        }
        else{
            // if the data type is directory then map over the data and show them inside a html li tag with icon
            fs.readdir(requirePath,{encoding:"utf-8"},(err,dirData)=>{
                if(err){
                    res.writeHead(404,{"content-type":"text/plain"})
                    res.end("404 File can't read")
                }
                else{
                    res.writeHead(200,{"content-type":"text/html"})
                    dirData.map((ele)=>{
                     const dir=path.join(req.url,ele)

                    //  To find the icon press `windows` + `.` key and serch 'folder' for directory and 'page' for file

                    //  const icon = fs.statSync(path.join(requirePath, ele)).isDirectory() ? "📁" : "📄";

                    // Only take help of chatgpt To  get folder and file icon code 

                /*Folder Icon: 📁
                    Unicode: \uD83D\uDCC1
                   HTML Entity: &#128193;
                   File Icon: 📄
                   Unicode: \uD83D\uDCC4
                   HTML Entity: &#128196;*/

                      // use fs.stat() to check file/directory is exist in given path
                     const icon = fs.statSync(path.join(requirePath, ele)).isDirectory() ? "&#128193;" : "&#128196;";
                     
                     return res.write(`<li>${icon}<a href=${dir}>${ele} </a></li>`)
                    })
                    res.end()
                }
            })
        }
     }
    })
})



server.listen(port,()=>{
    console.log(`server running on port:- ${port}`)
})