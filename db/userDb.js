const mongoose = require('mongoose');
const goalSchema = require('../models/Goal');

const connections = {}; // caches per-user mongoose connections

function getUserDb(userId) {
  if (!userId) throw new Error('Missing userId');
  if (connections[userId]) {
    return connections[userId];
  }

  const dbName = `goals_${userId}`;
  const uri = `${process.env.MONGO_URI_BASE}/${dbName}`;

  const conn = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const Goal = conn.model('Goal', goalSchema);
  connections[userId] = { conn, Goal };
  return connections[userId];
}

module.exports = getUserDb;
