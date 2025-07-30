const express = require('express');
const {
  addNewGoal,
  getAllGoals,
  getEachGoal,
  ongoingGoals,
  completedGoals,
  updateProgress,
  deleteGoal,
} = require('../controller/goalController');
const router = express.Router();

// optionally extract userId via middleware:
router.use((req, res, next) => {
  const userId = req.query.userId || req.headers['x-user-id'];
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId in query or header' });
  }
  req.userId = userId;
  next();
});

router.post('/', addNewGoal);
router.get('/all', getAllGoals);
router.get('/ongoing', ongoingGoals);
router.get('/completed', completedGoals);
router.get('/:id', getEachGoal);
router.patch('/:id/progress', updateProgress);
router.delete('/:id/delete', deleteGoal);

module.exports = router;
