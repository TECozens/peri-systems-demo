const express = require("express");
const router = express.Router();
const employees = require("../models/employeeModel");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

urlencodedParser = bodyParser.urlencoded({ extended: false });
jsonParser = bodyParser.json();

router.get("/", (req, res) => {
    res.send("Server is up and running");
});

router.post("/addEmployee", jsonParser, (req, res) => {
  let test = new employees();
  test._id = new mongoose.Types.ObjectId();
  test.role = req.body.role;
  test.name.first = req.body.name.first;
  test.name.last = req.body.name.last;
  test.email = req.body.email;
  test.password = req.body.password;
  test.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

module.exports = router;