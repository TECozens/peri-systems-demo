require('dotenv').config();

const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 8081;

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const cors = require("cors");
const bodyParser = require("body-parser");

const nodemailer = require('nodemailer');

var corsOptions = {
    origin: "http://localhost:3000",
};

// routes
const router = require("./routes/router");
const projectRouter = require("./routes/projectRoutes");
const usersRouter = require("./routes/usersRoutes");

//middlewares
app.use(bodyParser.json());
app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//Mongoose

//Schema Todo

/**atlas
 * username periGroup
 * password password2021
 * **/
const MONGODB_URI =
    "mongodb+srv://periGroup:password2021@pericluster.vn1i8.mongodb.net/periGroup?retryWrites=true&w=majority";

const mongoose = require("mongoose");
const db = require("./models");
const Role = db.role;

db.mongoose
    .connect(MONGODB_URI || "mongodb://localhost/peri_db", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });

mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected!!!");
});

const mdb = mongoose.connection;

mdb.on("error", console.error.bind(console, "connection error:"));
mdb.once("open", function () {
    // we're connected!
});

app.use(router);
app.use(usersRouter);
app.use(projectRouter);

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "designer",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'designer' to roles collection");
            });

            new Role({
                name: "technical",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'technical' to roles collection");
            });

            new Role({
                name: "admin",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}

// ********* EMAIL NOTIFICATION *********
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
  }
});

/**peri group temp email
* can be found in .env file
*/
let mailOptions = {
  from: 'peri.group2021@gmail.com',
// TODO: Need to add email for client based on order
  to: 'edge14031985@gmail.com',
  subject: 'Project Update',

/**TODO
* need to figure how to add data
* from the database to the email 
*/
  text: 'Hello {{name}} please find this email as an update to you project.'
};

transporter.sendMail(mailOptions, function(err, data) {
  if(err) {
      console.log('Error Occured!', err);
  } else {
      console.log('Email Sent!')
  }
});
