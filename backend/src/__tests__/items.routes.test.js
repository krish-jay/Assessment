process.env.NODE_ENV = "test";

jest.mock("../utils/io", () => ({
  readData: jest.fn(),
  writeData: jest.fn()
}));

const request = require("supertest");
const express = require("express");
const itemsRouter = require("../routes/items");
const { readData, writeData } = require("../utils/io");

// Build isolated app for testing
function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/api/items", itemsRouter);
  return app;
}
const app = createApp();

describe("GET /api/items", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns paginated items", async () => {
    readData.mockResolvedValue([
        { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 2499 },
    { id: 2, name: 'Noise Cancelling Headphones', category: 'Electronics', price: 399 },
    { id: 3, name: 'Ultra‑Wide Monitor', category: 'Electronics', price: 999 }
    ]);

    const res = await request(app).get("/api/items?page=1&limit=2");

    expect(res.status).toBe(200);
    expect(res.body.items.length).toBe(2);
    expect(res.body.pagination.totalItems).toBe(3);
    expect(readData).toHaveBeenCalledTimes(1);
  });

  test("filters items by search query", async () => {
    readData.mockResolvedValue([
        { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 2499 },
        { id: 2, name: 'Headphones', category: 'Electronics', price: 399 },
        { id: 3, name: 'Desk', category: 'Furniture', price: 799 }
    ]);

    const res = await request(app).get("/api/items?q=desk");

    expect(res.status).toBe(200);
    expect(res.body.items.length).toBe(1);
  });

  test("sorts items by field and order", async () => {
    readData.mockResolvedValue([
        { id: 1, name: 'A', category: 'Electronics', price: 2499 },
        { id: 2, name: 'B', category: 'Electronics', price: 399 },
        { id: 3, name: 'C', category: 'Electronics', price: 999 }
    ]);

    const res = await request(app).get("/api/items?sortBy=name&order=asc");

    expect(res.status).toBe(200);
    expect(res.body.items.map(i => i.name)).toEqual(["A", "B", "C"]);
  });
});

describe("GET /api/items/:id", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns item by ID", async () => {
    readData.mockResolvedValue([{ id: 100, name: "Laptop" }]);

    const res = await request(app).get("/api/items/100");

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Laptop");
  });

  test("returns 404 for missing item", async () => {
    readData.mockResolvedValue([]);

    const res = await request(app).get("/api/items/999");

    expect(res.status).toBe(404);
  });
});

describe("POST /api/items", () => {
  beforeEach(() => jest.clearAllMocks());

  test("creates a new item", async () => {
    readData.mockResolvedValue([]);
    writeData.mockResolvedValue();

    const newItem = { name: "New Item", category: "Test" };

    const res = await request(app).post("/api/items").send(newItem);

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("New Item");
    expect(writeData).toHaveBeenCalledTimes(1);
  });
});
