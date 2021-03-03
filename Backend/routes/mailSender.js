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
        to: 'sepehr2000.sn@gmail.com',
        subject: "Status update on your order",
        text: 'status has been updated'
        // subject: req.body.subject,
      //   text: `
      // from:
      // ${req.body.name}
      //
      // contact: ${req.body.email}
      //
      // message:
      //
      // ${req.body.texttext}`
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