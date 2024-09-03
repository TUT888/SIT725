# Week 7 Task - Socket

This week focus on socket implementation

Changes includes (with sockets):
- Server (server.js):
    - When a client connects, announce them with a allocated ID through 'ID' event.
    - For every 5 seconds, announce the client with a random number through 'number' event.
    - Receive the calculation activity from every client through 'calculation' event, then send back the announcement to all other clients.
    - When a client disconnect, update the remaining users.
- Client (script.js):
    - Receive ID from the server through 'ID' event.
    - Receive random number from the server through 'number' event.
    - When perform a calculation (click on CAL button), send the message through 'calculation' event
    - Receive the calculation announcement through 'announcement' event.