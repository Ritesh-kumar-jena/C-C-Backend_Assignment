//   import crypto module for use crypto module to  generate random number
  const crypto=require("crypto")

//   use process.argv for catch our input in terminal 
const operation=process.argv[2]
const one=process.argv[3]
const two=process.argv[4]

// change input type string to number format
const num1=Number(one)
const num2=Number(two)

// use switchcase to know which task perform

switch (operation) {
    case "add":{
        console.log(num1+num2)
        break
    }
     case "sub" :{
        console.log(num1-num2)
        break;
     }  
     case "mult" :{
        console.log(num1*num2)
        break;
     } 
     case "divide" :{
        console.log(num1/num2)
        break;
     } 
     case "sin" :{
        console.log(Math.sin(num1))
        break;
     } 
     case "cos" :{
        console.log(Math.cos(num1))
        break;
     } 
     case "tan" :{
        console.log(Math.tan(num1))
        break;
     } 
     case "random" :{
        // cheack our length is provide or not and if it's provide then it is in number format or not
           if(isNaN(num1)){
            console.log("Provide length for random number generation.")
           }
           else{
            crypto.randomBytes(num1,(err,buf)=>{
                if(err){
                    console.log(err)
                }
                else{
                    console.log(buf.toString("binary"))
                }
            })
           }
        break;
     }  
// if our operation name is not matching
    default:
        console.log("Invalid operation")
        
}
