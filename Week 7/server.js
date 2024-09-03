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
var currentID = 0;
var userList = []
io.on('connection', (socket) => {
    currentID += 1;
    var currentDate = new Date().toLocaleDateString();

    // Create new user data
    const newUser = {"userID": `US${currentID}`, "sessionID": socket.id};
    userList.push(newUser);
    // Display new user information
    console.log(`New connection on ${currentDate}: 
        Assigned ID = ${newUser.userID}
        Session id = ${newUser.sessionID} 
        Total user = ${userList.length}`);
    socket.on('disconnect', () => {
        let index = userList.indexOf(newUser);
        if (index > -1) { // only splice array when item is found
            userList.splice(index, 1); // 2nd parameter means remove one item only
        }
        console.log(`User ${newUser.userID} disconnected! Remaining user: ${userList.length}`);
        userList.forEach(element => {
            console.log(`\tUser: ${element.userID} - ${element.sessionID}`);
        });
    });

    socket.emit('ID', newUser.userID);
    // Send random number every 5 seconds
    setInterval(() => {
        socket.emit('number', parseInt(Math.random()*10));
    }, 5000)

    // Catch the new calculation event
    socket.on('calculation', (data) => {
        announcement = `Calculation made by a user ${data.ID}: ${data.cal}`;
        // Print the announcement got from calculation event
        console.log(`[CALCULATION] ${announcement}`);
        // Send announcement to other users through announcement event
        io.emit('announcement', announcement);
    });
});


// Start server
http.listen(port, () => {
    console.log("Hello I'm listening to port " + port);
    console.log("http://localhost:" + port);
})