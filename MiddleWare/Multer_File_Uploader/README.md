# Building a File Uploader with Node.js and Express
## Overview:
- This project is focused on creating a file uploader service using Express in Node.js. You will set up an Express server that handles file uploads via a POST request and serves a simple HTML form for file submission. The objective is to understand how to work with file uploads in a Node.js environment using the Multer middleware for handling multipart/form-data.

## Topics Covered:
### Express.js Server Setup
- File Upload Handling
- Working with Multer Middleware
- Basic Frontend Form Submission
- Problem Statement:
- Develop an Express server with the ability to handle file uploads. The server should:

- Serve an HTML form from the root route (/) for file submission.
- Handle file uploads via a POST request to /upload.
- Utilize the Multer middleware for processing file uploads.
- Once the file has been processed by server, it needs to be uploaded to cloudinary and you need to store the url to send in the response.
- Provide feedback to the user upon successful file upload with a status code of 200 and a confirmation message.
#### Folder Structure:
- src
- index.html - Contains the HTML form for file submission.
- index.js - The main server file.
- uploads - Directory for storing uploaded files (created by Multer).
#### Expected Behaviors:
- GET Request to /: Should serve an HTML page with a form for file uploading, responding with status code 200.
-POST Request to /upload: Allows file uploading through the form, and on success, responds with:
{
   "message": "file uploaded successfully",
   "imageUrl" : "<cloudinaryLink>"
}
- with a status code of 200.