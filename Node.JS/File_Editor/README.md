## Node.js File Editor
### Overview
- Create a Node.js program that allows for basic file manipulation.The program should take command line arguments to specify the desired operation (command for the particular operation are given in "()" , use those commands only ):

 - reading ( read )
 - deleting ( delete )
 - creating ( create )
 - appending ( append )
 - rename ( rename )
 - list ( list )
- and the file or directory to be affected. For example, running 'node index.js read test.txt' should output the contents of the file 'test.txt', and 'node index.js append test.txt CONTENT' should append the string 'CONTENT' to the end of the file. Additionally, the program should support renaming files and listing the contents of a directory, for example, 'node index.js rename test.txt new.txt' and 'node index.js list .' respectively.

### Detailed Explanation
#### Topics
- Taking input from terminal.
- File System Module.
- Node.js basics.
- Setup Guidelines and Instructions
- The code should be written in Node.js.
- Use process.argv property to retrieve the command line arguments passed to the script.
- Use console.log() to output the result of the calculation.
- Handle cases where the wrong number of arguments or invalid operations are passed.
- Add comments throughout your code to explain the logic behind each step.
- you can use any node version that works for you ( 14+ )
### Problem Statement
- Create a file called "test.txt" in the same directory as your Node.js program and add some text to it.
- Input: node index.js read test.txt
- Expected output: The contents of the file "test.txt"
in the same "test.txt" directory as your Node.js program and add some text to it.(the new text should always be append in a new line)
- Input: node index.js append "new content" test.txt
- Expected output: "Content appended to the file 'test.txt'"
- Create a file called "test.txt" in the same directory as your Node.js program and add some text to it.
- Input: node index.js delete test.txt
- Expected output: "File 'test.txt' deleted"
- Create a file called "test.txt" in the same directory as your Node.js program
- Input: node index.js create test.txt
- Expected output: "File 'test.txt' created"
- Create a file called "test.txt" in the same directory as your Node.js program and add some text to it.
- Input: node index.js rename test.txt new.txt
- Expected output: "File 'test.txt' renamed to 'new.txt'"
- List of all files and directories in current dir
- Input: node index.js list .
- Expected output: A list of all files and directories in the current directory.