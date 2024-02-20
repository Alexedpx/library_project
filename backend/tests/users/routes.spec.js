// Import required dependencies
const jwt = require("jsonwebtoken");
const { app, request, tables } = require("../setup");

// Générez un token valide pour les tests
const generateValidToken = async () => {
  const user = {
    id: 1,
  };

  return jwt.sign(user, process.env.APP_SECRET, { expiresIn: "1h" });
};

// Test suite for the GET /api/jeu route

describe("GET api/users && api/users/:id", () => {
  const idTestValide = 1;

  // Test de la route "read"
  it("should get a single user by ID", async () => {
    const response = await request(app).get(`/api/users/${idTestValide}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].id).toBe(idTestValide);
  });

  it("should return 404 for non-existent user", async () => {
    const response = await request(app).get(`/api/users/0`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });

  // Test de la route "readAll"
  it("should get all users", async () => {
    const response = await request(app).get(`/api/users`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.length).toBeGreaterThan(0);
  });
});

// Test suite for the POST /api/jeu route

describe("POST /api/users", () => {
  it("should insert a user successfully", async () => {
    const token = await generateValidToken();
    const testUser = {
      pseudo: "test user",
      email: "test@example.com",
      hashed_password: "hashedPassword",
      avatar: "/images/avatar.jpg",
      style_favoris: "test",
    };

    const response = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toEqual(expect.any(Number));

    // Check if the newly added game exists in the database
    const foundItem = await tables.user.read(response.body.insertId);

    expect(foundItem).toBeDefined();
    expect(foundItem[0].name).toBe(testGame.name);
  });
});

// Test suite for the PUT /api/jeu/:id route
describe("PUT /api/users/:id", () => {
  it("should update an existing user successfully", async () => {
    // Define a sample game for testing
    const token = await generateValidToken();
    const testUser = {
      pseudo: "test user",
      email: "test@example.com",
      hashed_password: "hashedPassword",
      avatar: "/images/avatar.jpg",
      style_favoris: "test",
    };

    // Create a sample game in the database
    const [result] = await tables.user.insert(
      testUser.pseudo,
      testUser.email,
      testUser.hashed_password,
      testUser.avatar,
      testUser.style_favoris
    );

    // Define an updated game object
    const updatedUser = {
      id: insertId,
      pseudo: "test user",
      email: "test@mail.com",
      hashed_password: "hashedPassword",
      avatar: "/images/avatar.jpg",
      style_favoris: "test",
    };

    // Send a PUT request to the /api/jeu/:id endpoint with updated data
    const response = await request(app)
      .put(`/api/users/${result.insertId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedUser);

    // Assertions
    expect(response.status).toBe(200);

    // Check if the game has been updated in the database
    const foundItem = await tables.user.read(result.insertId);

    // Assertions
    expect(foundItem).toBeDefined();
    expect(foundItem[0].name).toBe(updatedGame.name);
  });
});

// Test suite for the DELETE /api/jeu/:id route
describe("DELETE /api/users/:id", () => {
  it("should delete an existing user successfully", async () => {
    // Define a sample game for testing
    const token = await generateValidToken();
  
    const testUser = {
        id: insertId,
        pseudo: "test user",
        email: "test@example.com",
        hashed_password: "hashedPassword",
        avatar: "/images/avatar.jpg",
        style_favoris: "test",
      };
  

    // Create a sample game in the database
    const [result] = await tables.user.insert(
        testUser.pseudo,
        testUser.email,
        testUser.hashed_password,
        testUser.avatar,
        testUser.style_favoris
    );

    // Send a DELETE request to the /api/jeu/:id endpoint
    const response = await request(app)
      .delete(`/api/users/${result.insertId}`)
      .set("Authorization", `Bearer ${token}`);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the game has been deleted from the database
    const foundItem = await tables.user.read(result.insertId);

    // Assertions
    expect(foundItem.length).toBe(0);
  });
});
