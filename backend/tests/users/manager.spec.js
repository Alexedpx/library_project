// Import required dependencies
const { database, tables } = require("../setup");

// Test suite for the insert method of JeuxManager
describe("Insert user", () => {
  it("should insert a user successfully", async () => {
    // Define a sample game for testing

  
    const testUser = {
      pseudo: "test user",
      email: "test@example.com",
      hashed_password: "hashedPassword",
      avatar: "/images/avatar.jpg",
      style_favoris: "test",
     
    };

    // Send an insert request to the jeu table with a test jeu
    const insertId = await tables.user.insert(
        testUser.pseudo,
        testUser.email,
        testUser.hashed_password,
        testUser.avatar,
        testUser.style_favoris,
    
    );

    // Check if the newly added jeu exists in the database
    const [rows] = await database.query("SELECT * FROM user WHERE id = ?", [
      insertId[0].insertId,
    ]);

    const foundUser = rows[0];

    // Assertions
    expect(foundUser).toBeDefined();
    expect(foundUser.pseudo).toBe(testUser.pseudo);
    expect(foundUser.email).toBe(testUser.email);
    expect(foundUser.hashed_password).toBe( testUser.hashed_password);
    expect(foundUser.avatar).toBe( testUser.avatar);
    expect(foundUser.style_favoris).toBe( testUser.style_favoris);
  
  });

  it("should throw when passing invalid object", async () => {
    // Send an insert request to the jeu table with an incomplete object
    const promise = tables.user.insert({});

    // Assertions
    await expect(promise).rejects.toThrow();
  });
});
