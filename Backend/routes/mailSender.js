const express = require('express');
const mailSenderRouter = express.Router();
const nodemailer = require('nodemailer');
console.log("from mailSender");

module.exports = mailSenderRouter;