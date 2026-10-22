// server.js — Lab 3 starting point (Express)
//
// This is the end state of the Week 4 practice: the app reads DATABASE_URL
// from the environment and proves the database connection at /health/db.
//
// Lab 3, Task A asks you to:
//   1. read the port from the environment (see PORT below);
//   2. add a /health endpoint (see the TODO).
const express = require("express");
const { Pool } = require("pg");

const APP_VERSION = "1.0.0"; // Lab 3, Task E: change this, merge, and watch it go live
const APP_ENV = process.env.APP_ENV ?? "development";
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set"); // crash at start

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 3000,
});

const app = express();

app.get("/", (req, res) => {
  res.json({ app: "notes", status: "running", version: APP_VERSION, env: APP_ENV });
});

app.get("/health/db", async (req, res) => {
  // Week 4: proves the database works. Not the platform health check —
  // on Render it reports an error until Week 7 connects Supabase.
  try {
    const r = await pool.query("SELECT count(*) AS n FROM notes");
    res.json({ db: "ok", notes: Number(r.rows[0].n) });
  } catch (err) {
    console.error("health/db failed:", err.message); // detail to the logs, not the browser
    res.status(503).json({ db: "error" });
  }
});

// TODO (Lab 3, Task A): add a GET /health endpoint here.
// It must be fast, need no login, and touch nothing — not even the database.

// TODO (Lab 3, Task A): the port is hard-coded. Read it from process.env.PORT,
// keeping 8000 as the local default.
const PORT = 8000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`listening on 0.0.0.0:${PORT}`);
});

// Exit promptly when the platform stops the container (rule 4: graceful shutdown).
// Node does not stop on SIGTERM by itself when it runs as PID 1 in a container.
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down");
  server.close(() => pool.end().finally(() => process.exit(0)));
});
