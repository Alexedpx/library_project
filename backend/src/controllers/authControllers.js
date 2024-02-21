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

module.exports = {
  login,
};
