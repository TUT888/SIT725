const express= require("express");
const app = express();
const port = process.env.port || 3000;
// MongoDB connect
require('./dbConnection');
// Import routers
let router = require('./routers/router');
// Create socket
const { Socket } = require('socket.io');
let http = require('http').createServer(app);
let io = require('socket.io')(http);

// Use express
app.use(express.static(__dirname + "/public"))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routing
app.use('/api', router);

// Socket
var currentDate = new Date();
var sec = 0;
io.on('connection', (socket) => {
    console.log(`User has connected on ${currentDate.toLocaleDateString()}`);
    sec = 0;
    socket.on('disconnect', () => {
        console.log('User disconnected!');
    });

    setInterval(() => {
        sec += 1;
        socket.emit('Seconds', sec);
        console.log(`Connected for ${sec} seconds...`);
    }, 1000)
});

// Start server
http.listen(port, () => {
    console.log("Hello I'm listening to port " + port);
    console.log("http://localhost:" + port);
})