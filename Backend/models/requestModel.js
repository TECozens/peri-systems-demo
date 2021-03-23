const mongoose = require("mongoose");

const Request = mongoose.model(
    "Request",
    new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        project_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "projects",
        },
    })
);

module.exports = Request;
