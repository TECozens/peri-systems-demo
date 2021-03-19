const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const designModel = new Schema(
    {
        name: String,
        designer_id: {type: Schema.Types.ObjectId, ref: "User"},
        time_set: Date,
        img: {
            data: Buffer,
            contentType: String,
        }
    }
);

module.exports = new mongoose.model('Design', designModel)