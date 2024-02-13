// Assurez-vous que votre route est correctement configurée pour gérer la création ou la mise à jour des favoris
// Vous devez extraire les informations de l'objet `req.body` comme vous l'avez fait dans votre code existant

const tables = require("../tables");

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  console.log('Received request to add favorite:', req.body);
  const favoris = {
    bookId: req.body.bookId,
    userId: req.body.userId,
  };

  try {
    // Insert the item into the database
    const insertId = await tables.favoris.create(favoris);
    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  // Extract the item data from the request body
  const { userId, bookId } = req.params;

  try {
    const result = await tables.favoris.delete(userId, bookId);
    res.status(201).send(result);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  add,
  destroy,
};
