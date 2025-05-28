const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6: Register a new user
public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Task 10: Get the book list available in the shop using callback function
public_users.get('/', function (req, res) {
    const getBooks = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(books);
        }, 1000);
    });

    getBooks
        .then((booksList) => {
            return res.status(200).json(booksList);
        })
        .catch((error) => {
            return res.status(500).json({message: "Error getting books list"});
        });
});

// Task 11: Get book details based on ISBN using async/await
public_users.get('/isbn/:isbn', async function (req, res) {
    try {
        const isbn = req.params.isbn;
        const getBookByISBN = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (books[isbn]) {
                    resolve(books[isbn]);
                } else {
                    reject(new Error("Book not found"));
                }
            }, 1000);
        });

        const book = await getBookByISBN;
        return res.status(200).json(book);
    } catch (error) {
        return res.status(404).json({message: "Book not found"});
    }
});

// Task 11: Get book details based on ISBN using callback function
public_users.get('/isbn-callback/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const getBookByISBN = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (books[isbn]) {
                resolve(books[isbn]);
            } else {
                reject(new Error("Book not found"));
            }
        }, 1000);
    });

    getBookByISBN
        .then((book) => {
            return res.status(200).json(book);
        })
        .catch((error) => {
            return res.status(404).json({message: "Book not found"});
        });
});
  
// Task 12: Get book details based on author using async/await
public_users.get('/author/:author', async function (req, res) {
    try {
        const author = req.params.author;
        const getBooksByAuthor = new Promise((resolve, reject) => {
            setTimeout(() => {
                let filtered_books = {};
                for (let key in books) {
                    if (books[key].author.toLowerCase() === author.toLowerCase()) {
                        filtered_books[key] = books[key];
                    }
                }
                if (Object.keys(filtered_books).length > 0) {
                    resolve(filtered_books);
                } else {
                    reject(new Error("No books found for this author"));
                }
            }, 1000);
        });

        const booksList = await getBooksByAuthor;
        return res.status(200).json(booksList);
    } catch (error) {
        return res.status(404).json({message: "No books found for this author"});
    }
});

// Task 12: Get book details based on author using callback function
public_users.get('/author-callback/:author', function (req, res) {
    const author = req.params.author;
    const getBooksByAuthor = new Promise((resolve, reject) => {
        setTimeout(() => {
            let filtered_books = {};
            for (let key in books) {
                if (books[key].author.toLowerCase() === author.toLowerCase()) {
                    filtered_books[key] = books[key];
                }
            }
            if (Object.keys(filtered_books).length > 0) {
                resolve(filtered_books);
            } else {
                reject(new Error("No books found for this author"));
            }
        }, 1000);
    });

    getBooksByAuthor
        .then((booksList) => {
            return res.status(200).json(booksList);
        })
        .catch((error) => {
            return res.status(404).json({message: "No books found for this author"});
        });
});

// Task 13: Get all books based on title using async/await
public_users.get('/title/:title', async function (req, res) {
    try {
        const title = req.params.title;
        const getBooksByTitle = new Promise((resolve, reject) => {
            setTimeout(() => {
                let filtered_books = {};
                for (let key in books) {
                    if (books[key].title.toLowerCase() === title.toLowerCase()) {
                        filtered_books[key] = books[key];
                    }
                }
                if (Object.keys(filtered_books).length > 0) {
                    resolve(filtered_books);
                } else {
                    reject(new Error("No books found with this title"));
                }
            }, 1000);
        });

        const booksList = await getBooksByTitle;
        return res.status(200).json(booksList);
    } catch (error) {
        return res.status(404).json({message: "No books found with this title"});
    }
});

// Task 13: Get all books based on title using callback function
public_users.get('/title-callback/:title', function (req, res) {
    const title = req.params.title;
    const getBooksByTitle = new Promise((resolve, reject) => {
        setTimeout(() => {
            let filtered_books = {};
            for (let key in books) {
                if (books[key].title.toLowerCase() === title.toLowerCase()) {
                    filtered_books[key] = books[key];
                }
            }
            if (Object.keys(filtered_books).length > 0) {
                resolve(filtered_books);
            } else {
                reject(new Error("No books found with this title"));
            }
        }, 1000);
    });

    getBooksByTitle
        .then((booksList) => {
            return res.status(200).json(booksList);
        })
        .catch((error) => {
            return res.status(404).json({message: "No books found with this title"});
        });
});

// Task 5: Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
