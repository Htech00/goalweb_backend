const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const  goalRoutes = require("./routes/goalRoute");

const app = express()

const port = process.env.PORT || 4000;

// ALL middleware ||
//cors
app.use(cors())

//express
app.use(express.json());

// routes middleware
app.use("/api/goals", goalRoutes);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};
start();

//htechsolutionz
//R7sJreoCABF6zlu8

// mongodb+srv://htechsolutionz:R7sJreoCABF6zlu8@cluster0.os4ffun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
