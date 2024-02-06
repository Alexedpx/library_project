/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class userManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create({ pseudo, email, hashed_password, avatar, style_favoris }) {
    const [result] = await this.database.query(
      `insert into ${this.table} ( pseudo,
        email,
        hashed_password,  
        avatar, style_favoris ) values (?,?,?,?,?)`,
      [pseudo, email, hashed_password, avatar, style_favoris]
    );

    return result;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    const [result] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return result;
  }

  async readAll() {
    const [result] = await this.database.query(`select * from ${this.table}`);
    return result;
  }

  // The U of CRUD - Update operation

  async update({ id, pseudo, email, avatar, style_favoris }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET pseudo=?, email=?, avatar=?, style_favoris=?  WHERE id=?`,
      [pseudo, email, avatar, style_favoris, id]
    );
    return result;
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE from ${this.table} where id = ?`,
      [id]
    );
    return result;
  }

  async getByPseudo(pseudo) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE pseudo = ?`,
      [pseudo]
    );
    return result;
  }

  async getFavorites(id) {
    const [result] = await this.database.query(
      `SELECT user_id AS userId, book_id AS bookId FROM favoris
      JOIN ${this.table} ON ${this.table}.id = favoris.user_id
      WHERE user_id = ?`,
      [id]
    );
    return result;
  }

  async getFavoritesBooks(id) {
    const [result] = await this.database.query(
      `SELECT favoris.user_id AS userId, favoris.book_id AS bookId, book.titre, book.auteur, book.categorie, book.commentaire, book.date, book.image, book.description 
       FROM favoris
       JOIN ${this.table} ON ${this.table}.id = favoris.user_id
       JOIN book ON book.id = favoris.book_id
       WHERE favoris.user_id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = userManager;
