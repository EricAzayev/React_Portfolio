import { pool } from "../config/database.js";

const getEvents = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM events ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const selectQuery = `
      SELECT date, mountain, organizer, register, miles, startTime, duration
      FROM events
      WHERE id=$1
    `;
    const eventId = req.params.eventId;

    const result = await pool.query(selectQuery, [eventId]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getEvents,
  getEventById,
};

//export default GiftsController;
