# Basic Book API

This project is a simple RESTful API for managing a collection of books using Node.js, Express, and MongoDB (with Mongoose). It demonstrates CRUD operations and basic API design principles.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Root](#root)
  - [Books](#books)
- [Error Handling](#error-handling)
- [References](#references)

---

## Features

- Connects to MongoDB using Mongoose.
- Provides CRUD operations for books:
  - Create, Read (all/single), Update, Delete (single/all).
- Uses Express for routing and middleware.
- JSON request/response format.
- Example of hardcoded data and commented sample APIs for learning.

---

## Project Structure
Basic APIs/ 
│ ├── models/ 
│ └── bookModel.js # Mongoose schema/model for Book 
├── .gitignore 
├── index.js # Main server file with all routes 
└── README.md # This guide

---

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Abbas2003/Backend-Development.git
   cd "Backend-Development/Basic APIs"
   ```
2. **Install Dependencies:**
   ```sh
   npm install
   ```
3. Set up environment variables:
    - Create a .env file in the root directory.
    - Add your MongoDB connection string:
   ```sh
   MONGODB_URI=mongodb://localhost:27017/your-db-name
   ``` 
4. Run the server:
    ```sh
   node index.js
   ```
   The server will start on port 5000 by default.
   
---

## Environment Variables

* A `.env` file is used to store sensitive data.
* Add your MongoDB URI as `MONGODB_URI` in the `.env` file.
* The `.gitignore` file ensures that the `.env` file is not committed to version control.

## API Endpoints

### Root

**`GET /`**

Returns a simple greeting to verify that the API is running.

**Response:**

```json
"Hello World API"
```
--- 

## Books

### Get All Books 

**`GET /book`**

Returns all books in the database.

**Response:**

```json
{
  "isSuccessful": true,
  "data": [
    // ... array of book objects ...
  ]
}
```

### Get Single Book

**`GET /book/:id`**

Returns a single book by its MongoDB _id.

Path Parameter:
```sh
:id (string, required): The unique ID of the book.
```

**Response:**

```JSON
{
  "isSuccessful": true,
  "data": {
    // ... book object ...
  }
}
```

### Add a Book

**`POST /book`**

Adds a new book to the database.

Request Body:

```JSON
{
  "title": "Book Title",
  "description": "Book Description",
  "author": "Author Name",
  "noOfPages": 123
}
```

**Response:**

```JSON
{
  "isSuccessful": true,
  "data": {
    // ... created book object ...
  },
  "message": "Book Added Successfully"
}
```

### Update a Book

**`PUT /book/:id`**

Updates an existing book by its _id.

Path Parameter:
```sh
:id (string, required): The unique ID of the book to update.
```

Request Body:

```JSON
{
  // Any fields to update (e.g., title, description, author, noOfPages)
  "title": "Updated Book Title",
  "description": "Updated Book Description"
}
```

Response:

```JSON
{
  "isSuccessful": true,
  "data": {
    // ... updated book object ...
  },
  "message": "Book Updated Successfully"
}
```

### Delete a Book

**`DELETE /book/:id`**

Deletes a single book by its _id.

Path Parameter:
```sh
:id (string, required): The unique ID of the book to delete.
```
Response:

```JSON
{
  "isSuccessful": true,
  "data": {
    // ... deleted book object ...
  }
}
```

### Delete All Books

**`DELETE /book`**

Deletes all books in the database collection. Use with caution!

Response:

```JSON
{
  "isSuccessful": true,
  "message": "All books deleted successfully",
  "deletedCount": <number>
}
```

### Error Handling
All API endpoints will return a JSON response with the following structure if an error occurs:

```JSON
{
  "isSuccessful": false,
  "message": "Something went wrong"
}
```

The message field will contain a more specific error description.

## Notes
The bookModel.js file defines the Mongoose schema for books, including any required fields and unique constraints.
The code includes commented-out examples for a "courses" API using hardcoded data, which can be helpful for understanding basic API structure and routing.

## References

* [Express.js Documentation](https://expressjs.com/en/api.html)
* [Mongoose Documentation](https://mongoosejs.com/docs/)
* [MongoDB Manual](https://www.mongodb.com/docs/)
* [dotenv Documentation](https://www.npmjs.com/package/dotenv)
* [REST API Design Best Practices](https://restfulapi.net/)
* [Node.js Official Docs](https://nodejs.org/en/docs/)