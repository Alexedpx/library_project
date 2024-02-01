/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class bookManager extends AbstractManager {
  constructor() {
    super({ table: "book" });
  }

  // The C of CRUD - Create operation
  insert(
    image,
    titre,
    auteur,
    nombre_pages,
    date,
    categorie,
    description,
    commentaire,
    lu,
    userId
  ) {
    return this.database.query(
      `INSERT INTO ${this.table} (image, titre, auteur, nombre_pages, date, categorie, description, commentaire, user_id, lu) VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        image,
        titre,
        auteur,
        nombre_pages,
        date,
        categorie,
        description,
        commentaire,
        lu,
        userId,
      ]
    );
  }

  async create({
    image,
    titre,
    auteur,
    nombre_pages,
    date,
    categorie,
    description,
    lu,
  }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (
        image, titre, auteur, nombre_pages, date, categorie, description, lu  ) values (?,?,?,?,?,?,?,?)`,
      [image, titre, auteur, nombre_pages, date, categorie, description, lu]
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

  async readByUserId(userId) {
    const [rows] = await this.database.query(
      `SELECT  * FROM ${this.table} WHERE user_id=?`,
      [userId]
    );
    return rows;
  }

  async readAll() {
    const [result] = await this.database.query(`select * from ${this.table}`);
    return result;
  }

  // The U of CRUD - Update operation

  async update({ id, commentaire, lu }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET commentaire=?, lu=? WHERE id=?`,
      [commentaire, lu, id]
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
}

module.exports = bookManager;
