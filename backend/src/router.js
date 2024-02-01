const express = require("express");

const router = express.Router();
const { hashPassword } = require("./services/auth");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const bookControllers = require("./controllers/bookControllers");
const authControllers = require("./controllers/authControllers");
const uploadBook = require("./middlewares/uploadBook");

// Route to get a list of items
router.get("/users", userControllers.browse);
router.get("/books", bookControllers.browse);

// Route to get a specific item by ID
router.get("/users/:id", userControllers.read);
router.get("/books/:id", bookControllers.read);
router.get("/books/book-by-user/:id", bookControllers.readByUserId);

// Route to add a new item
router.post("/users", userControllers.add);
router.post("/books", bookControllers.add);
router.post("/books/addbook", uploadBook, bookControllers.getUploadImage);
router.post("/login", authControllers.login);
router.post("/signin", hashPassword, authControllers.signin);

// Route to modify an item
router.put("/users/:id", userControllers.edit);
router.put("/books/:id", bookControllers.edit);

// Route to delete an item
router.delete("/users/:id", userControllers.destroy);
router.delete("/books/:id", bookControllers.destroy);

/* ************************************************************************* */

module.exports = router;
