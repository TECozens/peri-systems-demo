const express = require("express");
const router = express.Router();
const projects = require("../models/projectModel");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

urlencodedParser = bodyParser.urlencoded({ extended: false });
jsonParser = bodyParser.json();

//TODO Populate
// router.get(
//     "/api/projects/getProjectByID/:projectId",
//     jsonParser,
//     (req, res) => {
//         let projectId = new mongoose.Types.ObjectId(req.params.projectId);
//         projects
//             .findById({ _id: projectId })
//             .populate("customer")
//             .exec(function (err, data) {
//                 if (err) {
//                     return res.json({ success: false, error: err });
//                 } else {
//                     return res.json({ success: true, data: data });
//                 }
//             });
//     }
// );

module.exports = router;
