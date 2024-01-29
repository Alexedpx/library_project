/* eslint-disable camelcase */
// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const books = await tables.book.readAll();

    // Respond with the items in JSON format
    res.json(books);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const books = await tables.book.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (books == null) {
      res.sendStatus(404);
    } else {
      res.json(books);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const edit = async (req, res, next) => {
  const {
    image,
    titre,
    auteur,
    nombre_pages,
    date,
    categorie,
    description,
    commentaire,
    lu,
  } = req.body;
  const updatedBooks = {
    id: req.params.id,
    image,
    titre,
    auteur,
    nombre_pages,
    date,
    categorie,
    description,
    commentaire,
    lu,
  };
  try {
    const existingBooks = await tables.book.read(req.params.id);
    if (existingBooks == null) {
      res.status(404).send("Books not found");
    } else {
      const result = await tables.user.update(updatedBooks);
      result.status(200).json(updatedBooks);
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const books = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.book.create(books);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy = async (req, res, next) => {
  // Extract the item data from the request body
  try {
    // Insert the item into the database
    const result = await tables.book.delete(req.params.id);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).send(result);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
