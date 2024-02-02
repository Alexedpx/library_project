/* eslint-disable camelcase */
const jwt = require("jsonwebtoken");
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
      // Respond with the user in JSON format (but without the hashed password)
      delete users[0].hashed_password;

      const token = await jwt.sign(
        { sub: users[0].id },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.json({
        token,
        user: users[0],
      });
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
    if (result) {
      const newUser = {
        id: result,
        pseudo,
        email,
        hashed_password,
        avatar,
      };
      const token = await jwt.sign(
        { sub: newUser.id },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(201).json({
        token,
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

module.exports = {
  login,
  signin,
};
