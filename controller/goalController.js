const goalsModel = require("../models/Goal");

// ====== CONTROLLER FOR CREATING/POST A NEW GOAL =======

const addNewGoal = async (req, res) => {
  try {
    const { title, description, progress } = req.body;

    const goal = await goalsModel.create({ title, description, progress });

    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ===== CONTROLLER TO GAT ALL EXISTING GOALS THAT HAS BEEN CREATED =====

const getAllGoals = async (req, res) => {
  try {
    const goals = await goalsModel.find();
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

const ongoingGoals = async(req,res) => {
    try {
        const goals = await goalsModel.find({progress: { $lt: 100} })
        console.log("ongoing goals retrieved:", goals);
        res.status(200).json(goals);
        
    } catch (err) {
        res.json(400).json({error: err.message })
        
    }
};

// ====== CONTROLLER TO GET ALL COMPLETED GOALS === (Progress === 100%)

const completedGoals = async(req, res) => {
    try {
        const goals = await goalsModel.find({progress:100});

        console.log("Completed goals retrieved:", goals);

        res.status(200).json(goals);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
};

// === CONTROLLER TO UPDATE/PATCH PROGRESS BY ID =====
const updateProgress = async (req, res) => {
    try {
        const {progress} = req.body;

        // Ensure progress is provided
        if (progress === undefined) {
            return res.status(400).json({ error: "Progress value is required"})
        }

        const progressUpdate = await goalsModel.findByIdAndUpdate(
            req.params.id,
            {progress},
            {new: true}
        )

        // if the goal doesnt exist, return a 404 error
        if (!progressUpdate) {
            return res.status(404).json({ error: "Goal not found"})
        }
        res.status(200).json(progressUpdate);

    } catch (err) {
        res.status(400).json({ error: err.message});
    }
    
};

// ===== CONTROLLER FOR DELETING GOAL BY ID ======

const deleteGoal = async(req, res) => {
    try {
        const deletedGoal = await goalsModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({error: "Goal not found"})
        }

        res.status(200).json({message: "Goal deleted successfully"})
    } catch (err) {
        res.status(400).json({error: err.message})
        
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
}