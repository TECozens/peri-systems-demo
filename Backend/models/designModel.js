const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Design = mongoose.model(
    "Design",
    new mongoose.Schema({
        name: String,
        email: String
    })
);

module.exports = Design