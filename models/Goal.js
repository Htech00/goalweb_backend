const mongoose = require("mongoose")

const goalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    progress: {
        type: Number,
        required: true,
        min:0,
        max: 100,
    },
})

module.exports = mongoose.model("Goals", goalSchema);