import { pool } from "../config/database.js";
import fallbackCountries from "../data/countries.js";

const getCountries = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM countries ORDER BY id ASC");
    return res.status(200).json(results.rows);
  } catch (err) {
    console.error("DB query failed in getCountries:", err);
    // Return a 500 and also provide a fallback dataset so frontend can still render
    try {
      return res.status(500).json({
        error: "Database unavailable - returning fallback data",
        data: fallbackCountries,
      });
    } catch (innerErr) {
      console.error("Failed to send fallback response:", innerErr);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default { getCountries };
