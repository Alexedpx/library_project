const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const { hashPassword, verifyToken } = require("./services/auth");
const userControllers = require("./controllers/userControllers");
const bookControllers = require("./controllers/bookControllers");
const authControllers = require("./controllers/authControllers");
const favorisControllers = require("./controllers/favorisControllers");
const uploadBook = require("./middlewares/uploadBook");

router.post("/login", authControllers.login);
router.post("/signin", hashPassword, authControllers.signin);
// Route to get a list of items

// Route to get a specific item by ID
router.use(verifyToken);
router.get("/users", userControllers.browse);
router.get("/books", bookControllers.browse);
router.get("/user/favoris/:id", userControllers.getFavorites);
router.get("/user/favoris/books/:id", userControllers.getFavoritesBooks);

router.get("/users/:id", userControllers.read);
router.get("/books/:id", bookControllers.read);
router.get("/books/book-by-user/:id", bookControllers.readByUserId);

// Route to add a new item
router.post("/users", userControllers.add);
router.post("/books", bookControllers.add);
router.post("/books/addbook", uploadBook, bookControllers.getUploadImage);
router.post("/favoris", favorisControllers.add);

// Route to modify an item

router.put("/users/:id", userControllers.edit);
router.put("/books/:id", bookControllers.edit);

// Route to delete an item
router.delete("/users/:id", userControllers.destroy);
router.delete("/books/:id", bookControllers.destroy);
router.delete("/favoris/:userId/:bookId", favorisControllers.destroy);

/* ************************************************************************* */
router.get("/userbytoken", userControllers.getByToken);
module.exports = router;
