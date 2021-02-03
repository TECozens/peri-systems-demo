const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

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

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

//Mongoose

//Schema Todo

/**atlas
 * username periGroup
 * password password2021
 * **/
const MONGODB_URI = 'mongodb+srv://periGroup:password2021@pericluster.vn1i8.mongodb.net/periGroup?retryWrites=true&w=majority';

const mongoose = require('mongoose');
mongoose.connect(MONGODB_URI || 'mongodb://localhost/peri_db', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!');
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
//