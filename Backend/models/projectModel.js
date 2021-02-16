const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const projectModel = new Schema({
  _id: Schema.Types.ObjectId,
  number: String,
  name: String,
  system: String,
  sector: String,
  description: String,
  client: String,
  engineers: {
    sales_engineer_id: Schema.Types.ObjectId,
    technical_lead_id: Schema.Types.ObjectId,
    designer_id: Schema.Types.ObjectId,
    design_checker_id: Schema.Types.ObjectId,
  },
  date_required: Date,
  anticipated_date: Date,
  status: [
    {
      time_set: Date,
      value: String,
    },
  ],
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("projects", projectModel);
