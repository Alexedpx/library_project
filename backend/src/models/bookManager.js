/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class bookManager extends AbstractManager {
  constructor() {
    super({ table: "book" });
  }

  async readByUserId(userId) {
    const [rows] = await this.database.query(
      `SELECT  * FROM ${this.table} WHERE user_id=?`,
      [userId]
    );
    return rows;
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
    statut,
    userId
  ) {
    return this.database.query(
      `INSERT INTO ${this.table} (image, titre, auteur, nombre_pages, date, categorie, description, commentaire, user_id, statut) VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        image,
        titre,
        auteur,
        nombre_pages,
        date,
        categorie,
        description,
        commentaire,
        statut,
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
    statut,
    userId,
  }) {
    console.info(userId);
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (
            image, titre, auteur, nombre_pages, date, categorie, description, statut, user_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        image,
        titre,
        auteur,
        nombre_pages,
        date,
        categorie,
        description,
        statut,
        userId,
      ]
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

  async update({ id, commentaire, statut }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET commentaire=?, statut=? WHERE id=?`,
      [commentaire, statut, id]
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
