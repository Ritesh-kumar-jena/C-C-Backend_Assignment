# Implementing Morgan Logger Middleware in Express
- This project involves setting up an Express server and integrating Morgan Logger Middleware to log HTTP requests for various routes. The objective is to familiarize students with middleware in Express, specifically for logging requests, and to understand the importance of logging in web applications for monitoring and debugging purposes.

## Detailed Explanation:
### Topics Covered:
- Express.js Setup
- Middleware Integration
- HTTP Request Logging
- File System Operations with Node.js
- Problem Statement:
- Create an Express server with the following specifications:

- The server should handle four HTTP methods: GET, POST, PUT, DELETE.
- Define five routes as specified in the test cases section.
- Integrate Morgan Logger Middleware to log every HTTP request made to these routes.
- Use the fs module to append these logs to an access.log file. Logs should include the Method, Status, Content-Length, Time-Taken, Date, HTTP Version, and the URL accessed, followed by a new line.
- Ensure the log format matches the provided output example.
### Expected Behaviors:
- GET Requests: Implement two GET routes (/ and /get-users) with specified responses and ensure they return status code 200.
- POST Request: /add-user should return a status code of 201 and a success message.
- PUT Request: /user/:id should return a status code of 201 and a message indicating successful update.
- DELETE Request: /user/:id should return a message indicating successful deletion.
- Logs should accurately reflect each request made to the server, formatted as per the given example.