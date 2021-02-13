const express = require("express");
const router = express.Router();
const projects = require("../models/projectModel");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

urlencodedParser = bodyParser.urlencoded({ extended: false });
jsonParser = bodyParser.json();

router.post("/addProject", jsonParser, (req, res) => {
  let project = new projects();
  project._id = new mongoose.Types.ObjectId();
  project.number = req.body.number;
  project.name = req.body.name;
  project.description = req.body.description;
  project.client = req.body.client;
  project.engineers.sales_engineer_id = req.body.engineers.sales_engineer_id;
  project.engineers.technical_lead_id = req.body.engineers.technical_lead_id;
  project.engineers.designer_id = req.body.engineers.designer_id;
  project.engineers.design_checker_id = req.body.design_checker_id;
  project.status.push({ time_set: new Date(), value: req.body.status });

  project.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.get(
  "/api/projects/getProjectsByDesigner/:designerID",
  jsonParser,
  (req, res) => {
    let designerId = new mongoose.Types.ObjectId(req.params.designerID);
    projects.find({ "engineers.designer_id": designerId }, (err, data) => {
      if (err) {
        return res.json({ success: false, error: err });
      } else {
        return res.json({ success: true, data: data });
      }
    });
  }
);

module.exports = router;
