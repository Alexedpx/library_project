/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class bookManager extends AbstractManager {
  constructor() {
    super({ table: "book" });
  }

  // The C of CRUD - Create operation

  async create({
    image,
    titre,
    auteur,
    nombre_pages,
    date,
    categorie,
    description,
    commentaire,
    lu,
    user_id,
  }) {
    const [result] = await this.database.query(
      `insert into ${this.table} ( pseudo,
        image, titre, auteur, nombre_pages, date, categorie, description, commentaire, lu, user_id ) values (?,?,?,?,?,?,?,?,?,?)`,
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
        user_id,
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

  async update({
    id,
    image,
    titre,
    auteur,
    nombre_pages,
    date,
    categorie,
    description,
    commentaire,
    lu,
    user_id,
  }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET image=?, titre=?, auteur=?, nombre_page=?, date=?, categorie=?, description=?, commentaire=?, lu=?,  WHERE id=?`,
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
        user_id,
        id,
      ]
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
