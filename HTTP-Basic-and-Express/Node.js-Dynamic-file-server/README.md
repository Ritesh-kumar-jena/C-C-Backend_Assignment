# Node.js Dynamic File Server
## Overview:
- This project involves creating a dynamic file server using Node.js that not only serves static files but also dynamically generates listings for directories and files with a user-friendly UI, including icons. The goal is to deepen your understanding of web servers, handling HTTP requests, and dynamically serving content based on user navigation.

### Detailed Explanation:
### Topics Covered:
- HTTP Protocol
- Node.js http and path Modules
- Dynamic Content Generation
- File System Operations
- Problem Statement:
- Your task is to develop a dynamic file server that:

- Provides a directory listing on the root URL (/), displaying all files and folders with appropriate icons (folders: , files: ).
- Enables navigation into nested directories through URL paths, dynamically generating listings for each directory visited.
- Serves actual file contents when a file is accessed directly.
- Returns a "404 Not Found" error for requests to non-existent directories or files.
- Utilizes the Node.js path module to correctly navigate filesystem paths based on URL routes.
### Hints:

- For the UI, manipulate <li> tags to include the Unicode HTML-code for folders and files, enhancing the visual presentation.
- Dynamically generate HTML to display directory contents with proper icons and anchor tags for navigation.
