const express = require('express');
const router = express.Router();
const employees = require("./models/employeeModel");
const projects = require("./models/projectModel");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

urlencodedParser = bodyParser.urlencoded({ extended: false });
jsonParser = bodyParser.json();

router.get('/', (req, res) => {
    res.send('Server is up and running');
});

router.post('/addEmployee',jsonParser, (req, res) => {

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

router.post('/addProject',jsonParser, (req, res) => {

    let testPro = new projects();
    testPro._id = new mongoose.Types.ObjectId();
    testPro.number = req.body.number;
    testPro.name = req.body.name;
    testPro.description = req.body.description;
    testPro.client = req.body.client;
    testPro.engineers.sales_engineer_id = req.body.engineers.sales_engineer_id;
    testPro.engineers.technical_lead_id = req.body.engineers.technical_lead_id;
    testPro.engineers.designer_id = req.body.engineers.designer_id;
    testPro.engineers.design_checker_id = req.body.design_checker_id;
    testPro.status.push({time_set: new Date, value: req.body.status});

    testPro.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });

});

module.exports = router;