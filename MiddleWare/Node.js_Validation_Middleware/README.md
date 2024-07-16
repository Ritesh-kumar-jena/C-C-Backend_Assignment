# Node.js Validation Middleware
## Overview:
- This project involves creating a TODO API server using Express in Node.js that includes a custom validation middleware. The middleware will ensure all incoming POST requests to the server meet specific data validation criteria before processing. The objective is to understand middleware implementation, data validation, and error handling in server-side applications.

### Detailed Explanation:
- Topics Covered:
- Node.js and Express
- Middleware in Express
- Data Validation
- Error Handling
- HTTP Status Codes
-Problem Statement:
- Create a TODO API server in Express with the following specifications:

- The server should have a single route / that accepts POST requests.
- The POST route will accept an object with specific keys and value types as follows:
{
  "ID": "number",
  "Name": "string",
  "Rating": "number",
  "Description": "string",
  "Genre": "string",
  "Cast": "array of strings"
}
- Implement a custom validation middleware to verify the data types of each field in the request body. The middleware should validate data before the request reaches the route handler.
- Key names are case-sensitive. Ensure accuracy in your implementation.
### Expected Behaviors:
- If the request body is correctly formatted with the appropriate data types, respond with HTTP status 200 and a message "data received".
- An invalid request body should result in a "invalid request body." response.
- Validate each field according to the criteria provided in the problem statement, responding accordingly.
- In case of validation failure, respond with HTTP status 400 and a message "bad request. some data is incorrect.", along with appropriate notes in res.txt for each field validation check.