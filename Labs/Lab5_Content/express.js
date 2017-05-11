//imports
var express = require("express");
var app = express();
var server = app.listen(3000);
console.log('Listening on 3000')
console.log('http://localhost:3000/')
var io = require('socket.io').listen(server);
var users = [];
var players = 0;
var turnOne = true;
var turnTwo = true;
var choiceOne = 0;
var choiceTwo = 0;

app.get("/", function(request, response) {
    response.sendFile('index.html', {
        root: __dirname
    })
})

app.use('/', express.static(__dirname))

io.on("connection", function(socket) {
    console.log('Successfully Loaded')
    if(players <= 2) {
        players++;
        socket.emit("id", {
            id: players
        });
    }

    socket.on("choice", function(data) {
        if (data.id == 1) {
            if (data.selection == 1) {
                console.log("Rock was selected by user 1")
                choiceOne = 1;
            }
            if (data.selection == 2) {
                console.log("Paper was selected by user 1")
                choiceOne = 2;
            }
            if (data.selection == 3) {
                console.log("Scissors was selected by user 1")
                choiceOne = 3;
            }
        } else if (data.id == 2) {
            if (data.selection == 1) {
                console.log("Rock was selected by user 2")
                choiceTwo = 1;
            }
            if (data.selection == 2) {
                console.log("Paper was selected by user 2")
                choiceTwo = 2;
            }
            if (data.selection == 3) {
                console.log("Scissors was selected by user 2")
                choiceTwo = 3;
            }
        }
    })
})
