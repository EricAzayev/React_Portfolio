import express from "express";
import path from "path";

import { fileURLToPath } from "url";

import countryData from "../data/countries.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).json(countryData);
});

router.get("/:name", (req, res) => { //creating get route for specific gift by name
  res.status(200).sendFile(path.resolve(__dirname, "../public/country.html"));
  //returns country.html, operated on by country.js
});

export default router;
