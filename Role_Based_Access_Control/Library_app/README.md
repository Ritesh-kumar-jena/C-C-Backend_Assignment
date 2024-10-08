# Library app
## Context:

### Please complete a small Library app in node.js (express) with ReactJS

## Problem statement:

#### Create two APIs that’s secured by (JWT), and protected by roles,

- Users with the role “CREATOR” can create books.
- Users with the role “VIEWER” can view books created by them.
- users with role “VIEW_ALL” can see all created books.
- Users with the role “CREATOR” can also delete a book.
- each user can have multiple roles
- show books that were created 10 minutes ago and more in API “/books?old=1”
- show books that were created less than 10 minutes ago “/books?new=1”
- Show all the books in a tabular format in a website
- Have filters and sorting option in the table along with the option to see books created within 10min ago and within 10min
- The users with “CREATOR” role can do the following in the website

- Have a “Add book” which asks the user to add the book to the DB
- Have a “Delete” icon on each row of the table which gets the confirmation from the user, calls the delete API and removes the book from the DB
- Have a “Edit” icon which allows the user to edit the details of the book
- The users with “VIEW_ALL” permission can only view the book and no action can be done in the website

## Expectations:

- Use a Mongo collection and it works when we switch to any mongodb

- Keep the connection information in an environment property.

- Basic validations must be there in the UI

- Try to avoid any console warnings. There must not be any console errors.

- Add a logger to log the API calls