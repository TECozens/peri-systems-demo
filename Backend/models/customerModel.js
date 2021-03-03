const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customer = mongoose.model(
    "name",
    new mongoose.Schema({
        name: String,
        email: String
    })
);

module.exports = customer