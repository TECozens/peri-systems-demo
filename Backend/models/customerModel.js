const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Customer = mongoose.model(
    "name",
    new mongoose.Schema({
        name: String,
        email: String
    })
);

module.exports = Customer