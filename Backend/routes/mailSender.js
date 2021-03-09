const express = require('express');
const mailSenderRouter = express.Router();
const nodemailer = require('nodemailer');
console.log("from mailSender");

const transport = {
    //all of the configuration for making a site send an email.
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.THE_EMAIL,
        pass: process.env.THE_PASSWORD
    }
};

const transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
    if(error) {
        //if error happened code ends here
        console.error(error)
    } else {
        //this means success
        console.log('users ready to mail myself')
    }
});

mailSenderRouter.post('/api/sendmail', (req,res, next) => {
    //make mailable object
    const mail = {
        from: process.env.THE_EMAIL,
        to: req.body.email,
        subject: "Dear " + req.body.name +  " - Status update on your order",
        text: 'Your project status has been updated. You can access your project timeline at localhost:3000/timeline/' + req.body.projectId,
        // subject: req.body.subject,
        // text: `
      // from:
      // ${req.body.name}
      //
      // contact:
      //
      // message:
      //
      // ${req.body.text}`
    }
// error handling goes here.
    transporter.sendMail(mail, (err,data) => {
        if(err) {
            res.json({
                status: 'fail'
            })
        } else {
            res.json({
                status: 'success'
            })
        }
    })
});

module.exports = mailSenderRouter;