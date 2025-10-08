import { pool } from "./database.js";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// Basic env check to avoid confusing connection errors when .env is missing
const requiredEnv = ["PGHOST", "PGUSER", "PGPASSWORD", "PGPORT", "PGDATABASE"];
const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length > 0) {
  console.error(
    "Missing required database environment variables:",
    missing.join(", ")
  );
  console.error(
    "Copy .env.example to .env and fill in your Postgres credentials, then re-run `npm run reset`."
  );
  process.exit(1);
}
import eventData from "../data/events.js";

const createEventsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        mountain VARCHAR(255) NOT NULL,
        organizer VARCHAR(255) NOT NULL,
        register INTEGER NOT NULL,
        miles VARCHAR(50) NOT NULL,
        startTime VARCHAR(20) NOT NULL,
        duration VARCHAR(30) NOT NULL)
    `;
  try {
    await pool.query(createTableQuery);
    console.log("🎉 events table created successfully");
  } catch (err) {
    console.error("Error creating events table", err);
    throw err;
  }
};

const seedEventsTable = async () => {
  await createEventsTable(); // Ensure the table is created before seeding

  for (const event of eventData) {
    const insertQuery = {
      text: "INSERT INTO events (date, mountain, organizer, register, miles, startTime, duration) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    };

    const values = [
      event.date,
      event.mountain,
      event.organizer,
      event.register,
      event.miles,
      event.startTime,
      event.duration,
    ];

    try {
      await pool.query(insertQuery, values);
      console.log(
        `✅ ${event.mountain} event on ${event.date} added successfully`
      );
    } catch (err) {
      console.error("⚠️ error inserting event", err);
    }
  }
};

seedEventsTable().catch((err) => {
  console.error("Seeding failed", err);
  process.exit(1);
});
