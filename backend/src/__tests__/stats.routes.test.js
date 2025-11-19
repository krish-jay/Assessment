process.env.NODE_ENV = "test";

jest.mock("../utils/io", () => ({
  readData: jest.fn(),
  writeData: jest.fn()
}));

jest.mock("../utils/stats", () => ({
  calculateStats: jest.fn()
}));

const request = require("supertest");
const express = require("express");
const statsRouter = require("../routes/stats");
const { readData } = require("../utils/io");
const { calculateStats } = require("../utils/stats");

// Build isolated app for tests
function createApp() {
  const app = express();
  app.use("/api/stats", statsRouter);
  return app;
}
const app = createApp();

describe("GET /api/stats", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset cache inside router by reloading it
    jest.resetModules();
  });

  test("returns fresh stats on first request", async () => {
    readData.mockResolvedValue([{ id: 1 }]);
    calculateStats.mockReturnValue({ count: 1 });

    const res = await request(app).get("/api/stats");

    expect(res.status).toBe(200);
    expect(res.body.cached).toBe(false);
    expect(readData).toHaveBeenCalledTimes(1);
    expect(calculateStats).toHaveBeenCalledTimes(1);
  });

  test("returns cached stats on second request", async () => {
    readData.mockResolvedValue([{ id: 1 }]);
    calculateStats.mockReturnValue({ count: 1 });

    // First request (fresh)
    await request(app).get("/api/stats");

    // Second request (cached)
    const res = await request(app).get("/api/stats");

    expect(res.status).toBe(200);
    expect(res.body.cached).toBe(true);

  });

  test("cache expires after 30 seconds", async () => {
    jest.useFakeTimers();

    readData.mockResolvedValue([{ id: 1 }]);
    calculateStats.mockReturnValue({ count: 1 });

    // First request
    await request(app).get("/api/stats");

    // Fast-forward 31 seconds
    jest.advanceTimersByTime(31000);

    // Second request
    const res = await request(app).get("/api/stats");

    expect(res.status).toBe(200);
    expect(res.body.cached).toBe(false); // cache expired

    jest.useRealTimers();
  });
});
