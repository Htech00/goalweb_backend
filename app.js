// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const  goalRoutes = require("./routes/goalRoute");

// const app = express()

// const port = process.env.PORT || 4000;

// // ALL middleware ||
// //cors
// app.use(cors())

// //express
// app.use(express.json());

// // routes middleware
// app.use("/api/goals", goalRoutes);

// const start = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("Database connected");
//     app.listen(port, () => {
//       console.log(`Server is running on ${port}`);
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };
// start();

// //htechsolutionz
// //R7sJreoCABF6zlu8

// // mongodb+srv://htechsolutionz:R7sJreoCABF6zlu8@cluster0.os4ffun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const goalRoutes = require('./routes/goalRoute');
const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
  "https://goalweb-frontend.vercel.app",
  "http://localhost:5174"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS policy does not allow this origin."), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

app.use('/api/goals', goalRoutes);

app.get('/', (req, res) => res.send('🌟 Goal API is running'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
