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

const readByUserId = async (req, res, next) => {
  try {
    const books = await tables.book.readByUserId(req.params.id);
    res.json(books);
  } catch (err) {
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
  const { commentaire, statut, pageLue } = req.body;

  const updatedBook = {
    id: req.params.id,
    commentaire,
    statut,
    pageLue,
  };

  try {
    const existingBook = await tables.book.read(req.params.id);
    if (existingBook == null) {
      res.status(404).send("Book not found");
    } else {
      const rest = await tables.book.update({
        ...existingBook,
        id: req.params.id,
        commentaire,
        statut,
        pageLue,
      });

      const updatedBook = await tables.book.read(req.params.id);
      res.status(200).json(updatedBook);
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation

const add = async (req, res, next) => {
  try {
    const {
      titre,
      auteur,
      nombre_pages,
      date,
      langue,
      categorie,
      description,
      commentaire,
      pageLue,
      statut,
      userId,
    } = req.body;

    // Create a new book object
    const newBook = {
      titre,
      auteur,
      nombre_pages,
      date,
      langue,
      categorie,
      description,
      commentaire,
      pageLue,
      statut,
      userId,
      image: `/images/book/${req.body.url}`,
    };

    console.info(req.body);
    console.info(newBook);

    // Insert the book into the database
    const insertId = await tables.book.create(newBook);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted book
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
  readByUserId,
};
