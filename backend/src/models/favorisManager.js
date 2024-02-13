const AbstractManager = require("./AbstractManager");

class favorisManager extends AbstractManager {
  constructor() {
    super({ table: "favoris" });
  }

  // The C of CRUD - Create operation

  async create({ bookId, userId }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (book_id, user_id) VALUES (?, ?)`,
      [bookId, userId]
    );

    return result;
  }

  // The D of CRUD - Delete operation

  async delete(userId, bookId) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE user_id = ? AND book_id = ?`,
      [userId, bookId]
    );
    return result;
  }

  // You can add more methods as needed for your specific use case.
}

module.exports = favorisManager;
