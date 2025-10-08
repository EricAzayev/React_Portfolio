import express from "express";
import path from "path";
import EventsController from "../controllers/events.js";



// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const router = express.Router();
console.log("route running");
router.get("/", EventsController.getEvents);
// router.get("/", (req, res) => {
//   res.status(200).json(giftData);
// });

router.get('/:eventId', EventsController.getEventById);
//router.get("/:giftId", (req, res) => {
  //router.get('/:giftId', GiftsController.getGiftByI)
  
  //creating get route
  //res.status(200).sendFile(path.resolve(__dirname, "../public/gift.html"));
//});

export default router;
