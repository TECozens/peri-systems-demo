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
        user: "team35nsa@gmail.com",
        pass: "Perisystems123"
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
        from: "team35nsa@gmail.com",
        to: req.body.email,
        subject: req.body.projects.name +  " #" + req.body.projects.number + " - Status update on your order",
        html: 'Dear ' +  req.body.name +
            ', <br/> We are writing to inform you about your order '
            + req.body.projects.name + ' #' +  req.body.projects.number +
            ' from PERI. We have some information regarding your project status. ' +
            'We are pleased to inform you that your project status has been updated. It has now passed ' +
            'the ' + req.body.projects.status.value + ' stage of its development ' +
            ' and is now currently on '+ req.body.projects.status.value + ' stage. ' +
            'You can find out more about your ' + 'project here: localhost:3000/customer/' + req.body.projects._id +
            // TODO INSERT TIMELINE IMAGE
            '<br> If you have any questions or issues regarding your project please feel free to contact us at anytime.' +
            '<br>You can contact us via Phone, Fax or Email: <br>Email: info@peri.ltd.uk<br>Phone: +44 (0) 1788 86 16 00<br>' +
            'Fax: +44 (0) 1788 86 16 10<br> <br>Kind Regards, <br>PERI Team',
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