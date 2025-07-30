const getUserDb = require('../db/userDb');

// utility to get the correct Goal model
function getGoalModel(req) {
  const userId = req.userId || req.query.userId || req.headers['x-user-id'];
  if (!userId) throw new Error('userId is required');
  return getUserDb(userId).Goal;
}

const addNewGoal = async (req, res) => {
  try {
    const Goal = getGoalModel(req);
    const { title, description, progress } = req.body;
    const goal = await Goal.create({ title, description, progress });
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllGoals = async (req, res) => {
  try {
    const Goal = getGoalModel(req);
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getEachGoal = async (req, res) => {
  try {
    const Goal = getGoalModel(req);
    const goal = await Goal.findById(req.params.id);
    goal ? res.json(goal) : res.status(404).json({ error: 'Not found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const ongoingGoals = async (req, res) => {
  try {
    const Goal = getGoalModel(req);
    const goals = await Goal.find({ progress: { $lt: 100 } });
    res.json(goals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const completedGoals = async (req, res) => {
  try {
    const Goal = getGoalModel(req);
    const goals = await Goal.find({ progress: 100 });
    res.json(goals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateProgress = async (req, res) => {
  try {
    const Goal = getGoalModel(req);
    const { progress } = req.body;
    if (progress === undefined) {
      return res.status(400).json({ error: 'Progress value is required' });
    }
    const updated = await Goal.findByIdAndUpdate(
      req.params.id,
      { progress: Number(progress) },
      { new: true }
    );
    updated ? res.json(updated) : res.status(404).json({ error: 'Not found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteGoal = async (req, res) => {
  try {
    const Goal = getGoalModel(req);
    const deleted = await Goal.findByIdAndDelete(req.params.id);
    deleted
      ? res.json({ message: 'Goal deleted successfully' })
      : res.status(404).json({ error: 'Not found' });
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
