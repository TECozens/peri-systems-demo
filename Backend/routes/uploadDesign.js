const express = require("express");
const router = express.Router();
const projects = require("../models/projectModel");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const designModel = require('../models/designModel');
const multer = require("multer");
const fs = require('fs')
const path = require('path')


urlencodedParser = bodyParser.urlencoded({ extended: false });
jsonParser = bodyParser.json();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/api/uploadDesign', jsonParser, (req, res) => {
    console.log(req.body)
    // console.log(res)
    console.log("Something was Sent")
    res.status(200).send( true );
    res.end();
});

module.exports = router;
