const express = require("express");
// const router = express.Router();
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const cors = require("cors");
const bodyParser = require("body-parser");
// require('dotenv').config();
//
// var corsOptions = {
//   origin: "http://localhost:5000",
// };

// routes
const router = require("./routes/router");
const projectRouter = require("./routes/projectRoutes");

//middlewares
app.use(bodyParser.json());
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * IO is here as i have read it can allow us to send
 * emails to client with updates on the jobs
 */
// io.on('connection', (socket) => {
//     console.log('');

//     socket.on('disconnect', () => {
//         console.log('');
//     })
// });

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
app.use(projectRouter);

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
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
