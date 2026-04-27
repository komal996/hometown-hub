const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.post("/", eventController.createEvent);
router.get("/", eventController.getEvents);
router.post("/join/:id", eventController.joinEvent);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

module.exports = router;