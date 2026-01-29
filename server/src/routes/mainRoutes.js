const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainControllers");

// Get tasks
router.get("/", mainController.getTasks);

// Create task
router.post("/", mainController.addTask);

// Delete task
router.delete("/:id", mainController.deleteTask);

// Update task
router.put("/:id", mainController.editComplete);

module.exports = router;