/* eslint-disable camelcase */
const argon2 = require("argon2");
const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const users = await tables.user.getByPseudo(req.body.pseudo);
    if (!users[0]) {
      res.sendStatus(400).send("Incorrect pseudo or password");
      return;
    }

    const verified = await argon2.verify(
      users[0].hashed_password,
      req.body.password
    );

    if (verified) {
      delete users[0].hashed_password;

      res.status(200).json(users[0]);
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { pseudo, email, hashed_password, avatar } = req.body;

    const result = await tables.user.create({
      pseudo,
      email,
      hashed_password,
      avatar,
    });
    if (result.insertId) {
      const newUser = {
        id: result.insertId,
        pseudo,
        email,
        hashed_password,
        avatar,
      };
      res.status(201).json(newUser);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  signin,
};
