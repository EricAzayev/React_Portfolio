import { pool } from "./database.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import countries from "../data/countries.js";

// Basic env check
const requiredEnv = ['PGHOST', 'PGUSER', 'PGPASSWORD', 'PGPORT', 'PGDATABASE'];
const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length > 0) {
    console.error('Missing required database environment variables:', missing.join(', '));
    console.error('Copy .env.example to .env and fill in your Postgres credentials, then re-run `npm run reset`.');
    process.exit(1);
}

// Create countries table
const createCountriesTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS countries;

    CREATE TABLE IF NOT EXISTS countries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        population_growth REAL NOT NULL,
        middle_class_growth REAL NOT NULL,
        urbanization_rate REAL NOT NULL,
        education_index REAL NOT NULL,
        economic_openness REAL NOT NULL
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log("🎉 countries table created successfully");
  } catch (err) {
    console.error("Error creating countries table", err);
    throw err;
  }
};

// Seed countries table
const seedCountriesTable = async () => {
  await createCountriesTable();

  for (const country of countries) {
    const insertQuery = {
      text: `
        INSERT INTO countries 
        (name, population_growth, middle_class_growth, urbanization_rate, education_index, economic_openness)
        VALUES ($1, $2, $3, $4, $5, $6)
      `,
    };

    const values = [
      country.name,
      country.population_growth,
      country.middle_class_growth,
      country.urbanization_rate,
      country.education_index,
      country.economic_openness
    ];

    try {
      await pool.query(insertQuery, values);
      console.log(`✅ ${country.name} added successfully`);
    } catch (err) {
      console.error("⚠️ error inserting country", err);
    }
  }
};

seedCountriesTable().catch((err) => {
  console.error("Seeding failed", err);
  process.exit(1);
});
