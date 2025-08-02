const express = require("express");
const { addNewGoal, getAllGoals, getEachGoal, completedGoals, updateProgress, deleteGoal, ongoingGoals } = require("../controller/goalController");

const router = express.Router()

// Create a route for addNewGoal
router.post("/",addNewGoal);

// Create a route for getAllGoals
router.get("/all", getAllGoals);


//Create a route for ongoingGoals
router.get("/ongoing",ongoingGoals)

// Create a route of completedGoals
router.get("/completed", completedGoals)

// Create a route for getEachGoal by :Id
router.get("/:id", getEachGoal)

// Create a route for updateProgress
router.patch("/:id/progress", updateProgress);

// Create a route  for deleteGoal
router.delete("/:id/delete", deleteGoal)

module.exports = router;