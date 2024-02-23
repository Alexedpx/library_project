/* eslint-disable camelcase */
// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const users = await tables.user.readAll();

    // Respond with the items in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const users = await tables.user.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (users == null) {
      res.sendStatus(404);
    } else {
      res.json(users);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const getFavorites = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const users = await tables.user.getFavorites(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (users == null) {
      res.sendStatus(404);
    } else {
      res.json(users);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const getFavoritesBooks = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const users = await tables.user.getFavoritesBooks(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (users == null) {
      res.sendStatus(404);
    } else {
      res.json(users);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

const edit = async (req, res, next) => {
  const { pseudo, email, avatar, style_favoris } = req.body;
  const updatedUsers = {
    id: req.params.id,
    pseudo,
    email,
    avatar,
    style_favoris,
  };
  try {
    const existingUsers = await tables.user.read(req.params.id);
    if (existingUsers == null) {
      res.status(404).send("Users not found");
    } else {
      const result = await tables.user.update(updatedUsers);
      res.status(200).json(updatedUsers);
    }
  } catch (err) {
    next(err);
  }
};

const getUploadImage = async (req, res, next) => {
  try {
    const [result] = await tables.user.updateAvatar(
      `/images/avatar/${req.body.url}`,
      req.auth.sub
    );
    if (result.affectedRows) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  try {
    const { pseudo, email, hashed_password, avatar } = req.body;

    const result = await tables.user.create({
      pseudo,
      email,
      hashed_password,
      avatar,
    });

    if (result) {
      const newUser = {
        id: result,
        pseudo,
        email,
        hashed_password,
        avatar,
      };

      res.status(201).json({
        pseudo: newUser.pseudo,
        email: newUser.email,
        avatar: newUser.avatar,
      });
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
};





const destroy = async (req, res, next) => {
  // Extract the item data from the request body
  try {
    // Insert the item into the database
    const result = await tables.user.delete(req.params.id);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).send(result);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};



const getByToken = async (req, res) => {
  const userInfo = req.auth;

  try {
    if (userInfo && userInfo.sub) {
      const user = await tables.user.read(userInfo.sub);

      if (user == null) {
        res.sendStatus(404);
      } else {
        res.json(user);
      }
    } else {
      res.status(404).send("User not found. Auth doesn't exist");
    }
  } catch (e) {
    res.status(500).send(`Internal server error : ${e}`);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  getByToken,
  getFavorites,
  getFavoritesBooks,
  getUploadImage,
};
