const db = require("../db/connection.js");
const app = require("../app");
const seed = require("../db/seed.js");
const request = require("supertest");
const testData = require("../db/data/test_data/todo.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api", () => {
  test("200: Server responds with a success message", async () => {
    const { ok } = await request(app).get("/api").expect(200);
    expect(ok).toBe(true);
  });
});
