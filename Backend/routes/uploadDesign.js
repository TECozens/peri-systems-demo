const express = require("express");
const router = express.Router();
const projects = require("../models/projectModel");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const designModel = require('../models/designModel');
const multer = require("multer");
const fs = require('fs')
const path = require('path')


urlencodedParser = bodyParser.urlencoded({extended: false});
jsonParser = bodyParser.json();


const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
}).single("myImage");

router.post('/api/uploadDesign', upload, (req, res) => {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);
    // console.log(req)
})


module.exports = router;
