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
        min: 0,
        max: 100,
    },
    userId: { // new field
        type: String,
        required: true
    }
});


module.exports = mongoose.model("Goals", goalSchema);