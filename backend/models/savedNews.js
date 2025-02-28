const mongoose = require("mongoose");

const SavedNewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    newsUrl: { type: String, required: true, unique: true},
    author: { type: String },
    date: { type: String },
    source: { type: String },
} );


module.exports = mongoose.model("SavedNews", SavedNewsSchema);
