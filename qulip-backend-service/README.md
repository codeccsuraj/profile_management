#Assignment - Simple CRUD Web Application
Backend - Service using Node.js 

## Overview

A simple web application that allows users to register, log in, and create, read, update, and delete (CRUD) posts. The applicatio is build using the MERN stack (MongoDB, Express.js, React, Node.js) and can be deployed on AWS.

- **POST /api/register**
  - **Description:** Register a new user.
  - **Request Body:**
    ```json
    {
      "firstName": "string",
      "lastName" : "string",
      "email": "string",
      "mobile" : "string",
      "password": "string",
    }
    ```
  - **Response:** Confirmation of registration or error message.

  ### User Authentication

- **POST /api/login**
  - **Description:** Authenticate a user and return a JWT.
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response:** JWT token for authenticated requests or error message.

  - **POST /api/posts**
  - **Description:** Create a new post (authenticated users only).
  - **Request Body:**
    ```json
    {
      "title": "string",
      "description": "string",
      "category" : "string"
    }
    ```
  - **Headers:** `Authorization: Bearer <token>`
  - **Response:** Confirmation of post creation or error message.


- **GET /api/posts**
  - **Description:** Retrieve all posts (publicly accessible).
  - **Response:** List of all posts or error message.

- **GET /api/posts/:id**
  - **Description:** Retrieve a single post by ID (publicly accessible).
  - **Response:** Post details or error message.

- **DELETE /api/posts/:id**
  - **Description:** Delete a post by ID (authenticated users only).
  - **Headers:** `Authorization: Bearer <token>`
  - **Response:** Confirmation of post deletion or error message.

- **PUT /api/posts/:id**
  - **Description:** Update a post by ID (authenticated users only).
  - **Request Body:**
    ```json
    {
      "title": "string",
      "content": "string"
    }
    ```
  - **Headers:** `Authorization: Bearer <token>`
  - **Response:** Confirmation of post update or error message.
  
  ## Setup

   **Clone the repository:**
      git clone <repository-url>
      cd <project-directory>
      npm install
## **Set up environment variables:**
    Create a .env file in the root directory and add the following variables:
    MONGO_URI=mongodb:
    SERVER_PORT=5000

    JWT_SECRET_KEY=
## Run the application:
npm run dev