const goalsModel = require("../models/Goal");

// ====== CONTROLLER FOR CREATING/POST A NEW GOAL =======

const addNewGoal = async (req, res) => {
  try {
    const { title, description, progress, userId } = req.body;

    const goal = await goalsModel.create({
      title,
      description,
      progress,
      userId,
    });

    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ===== CONTROLLER TO GAT ALL EXISTING GOALS THAT HAS BEEN CREATED =====

const getAllGoals = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const goals = await goalsModel.find({ userId });
    res.status(200).json(goals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ===== CONTROLLER TO GET A SINGLE GOAL BY ID ======

const getEachGoal = async (req, res) => {
  try {
    const goal = await goalsModel.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ====== CONTROLLER TO GET ALL ONGOING GOALS ====== (Progress < 100%)

const ongoingGoals = async (req, res) => {
  try {
    const userId = req.query.userId;
    const goals = await goalsModel.find({ progress: { $lt: 100 }, userId });
    console.log("ongoing goals retrieved:", goals);
    res.status(200).json(goals);
  } catch (err) {
    res.json(400).json({ error: err.message });
  }
};

// ====== CONTROLLER TO GET ALL COMPLETED GOALS === (Progress === 100%)

const completedGoals = async (req, res) => {
  try {
    const userId = req.query.userId;
    const goals = await goalsModel.find({ progress: 100, userId });

    console.log("Completed goals retrieved:", goals);

    res.status(200).json(goals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// === CONTROLLER TO UPDATE/PATCH PROGRESS BY ID =====
const updateProgress = async (req, res) => {
  try {
    const { progress, userId } = req.body;
    const goalId = req.params.id;

    // Validate progress
    if (progress === undefined) {
      return res.status(400).json({ error: "Progress value is required" });
    }

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Find goal by _id and userId to ensure ownership
    const goal = await goalsModel.findOne({ _id: goalId, userId: userId });

    if (!goal) {
      return res
        .status(404)
        .json({ error: "Goal not found or you do not have permission" });
    }

    // Update progress
    goal.progress = progress;
    await goal.save();

    return res
      .status(200)
      .json({ message: "Progress updated successfully", goal });
  } catch (error) {
    console.error("Error updating progress:", error);
    return res.status(500).json({ error: "Server error updating progress" });
  }
};

// ===== CONTROLLER FOR DELETING GOAL BY ID ======

const deleteGoal = async (req, res) => {
  try {
    const userId = req.body.userId; // or req.user.id if you have auth middleware
    const goalId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Find the goal that belongs to this user and delete it
    const deletedGoal = await goalsModel.findOneAndDelete({
      _id: goalId,
      userId: req.body.userId,
    });

    if (!deletedGoal) {
      return res
        .status(404)
        .json({ error: "Goal not found or you do not have permission" });
    }

    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  addNewGoal,
  getAllGoals,
  getEachGoal,
  ongoingGoals,
  completedGoals,
  updateProgress,
  deleteGoal,
};
