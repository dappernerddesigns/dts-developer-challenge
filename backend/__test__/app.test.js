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

describe("/tasks", () => {
  describe("GET", () => {
    test("200:Server responds with an object containing an array of all tasks", async () => {
      const {
        body: { tasks },
      } = await request(app).get("/api/tasks").expect(200);
      expect(tasks.length).toBe(21);
      tasks.forEach((task) => {
        expect(task).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            description: expect.any(String),
            status: expect.any(String),
            due: expect.any(String),
          })
        );
      });
    });
  });
  describe("POST", () => {
    test("201:Server responds with newly created task", async () => {
      const newTask = {
        title: "walk dog",
        description: "",
        status: "todo",
        due: "2025-04-10 12:00:00",
      };
      const {
        body: { task },
      } = await request(app).post("/api/tasks").send(newTask).expect(201);
      const { title, description, status, due } = task;
      expect(title).toBe("walk dog");
      expect(description).toBe("");
      expect(status).toBe("todo");
      expect(typeof due).toBe("string");
    });
    test("400:Server responds with a bad request if mandatory keys are missing", async () => {
      const {
        body: { msg },
      } = await request(app).post("/api/tasks").send({}).expect(400);
      expect(msg).toBe("Bad Request");
    });
  });
});

describe("/tasks/:id", () => {
  describe("GET", () => {
    test("200:Server responds with the requested task", async () => {
      const {
        body: { task },
      } = await request(app).get("/api/tasks/1").expect(200);
      const { id, title, description, status, due } = task;
      expect(id).toBe(1);
      expect(title).toBe(
        "ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper"
      );
      expect(description).toBe(
        "odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor"
      );
      expect(status).toBe("todo");
      expect(due).toBe("2024-12-05T05:39:44.000Z");
    });
    test("404:Server responds with a task not found message for a valid request with no results", async () => {
      const {
        body: { msg },
      } = await request(app).get("/api/tasks/99").expect(404);
      expect(msg).toBe("Task Not Found");
    });
    test("400:Server responds with a bad request message for request with an invalid id", async () => {
      const {
        body: { msg },
      } = await request(app).get("/api/tasks/one").expect(400);
      expect(msg).toBe("Bad Request");
    });
  });
  describe("PATCH", () => {});
  describe("DELETE", () => {});
});
