//imports
var express = require("express");
var app = express();
var server = app.listen(3000);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("rps.db");
console.log('Listening on 3000')
console.log('http://localhost:3000/')
var io = require('socket.io').listen(server);
var players = 0;
var turnOne = true;
var turnTwo = true;
var choiceOne = 0;
var choiceTwo = 0;
var winner = "";
var datetime;

app.get("/", function(request, response) {
    response.sendFile('index.html', {
        root: __dirname
    })
})

app.use('/', express.static(__dirname))

io.on("connection", function(socket) {
    console.log('Successfully Loaded')
    if (players <= 2) {
        players++;
    }

    socket.on("choice", function(data) {
        if (turnOne) {
            if (data.selection == 1) {
                console.log("Rock was selected by user 1")
                choiceOne = 1;
                turnOne = false;
                socket.broadcast.emit("start", {
                    start: true
                });
            }
            if (data.selection == 2) {
                console.log("Paper was selected by user 1")
                choiceOne = 2;
                turnOne = false;
                socket.broadcast.emit("start", {
                    start: true
                });
            }
            if (data.selection == 3) {
                console.log("Scissors was selected by user 1")
                choiceOne = 3;
                turnOne = false;
                socket.broadcast.emit("start", {
                    start: true
                });
            }
        } else if (!turnOne) {
            if (data.selection == 0) {
                console.log("No selection was made by user 2")
                choiceTwo = 0;
                turnTwo = false;
            }
            if (data.selection == 1) {
                console.log("Rock was selected by user 2")
                choiceTwo = 1;
                turnTwo = false;
            }
            if (data.selection == 2) {
                console.log("Paper was selected by user 2")
                choiceTwo = 2;
                turnTwo = false;
            }
            if (data.selection == 3) {
                console.log("Scissors was selected by user 2")
                choiceTwo = 3;
                turnTwo = false;
            }
        }
        if ((!turnOne) && (!turnTwo)) {
            if (choiceOne == 1 && choiceTwo == 1) {
                console.log("Tie!")
                socket.emit("outcome", {
                    winnerChoice: 1,
                    loserChoice: 1
                });
                socket.broadcast.emit("outcome", {
                    winnerChoice: 1,
                    loserChoice: 1
                });
                winner = "Tie"
            }
            if (choiceOne == 2 && choiceTwo == 2) {
                console.log("Tie!")
                socket.emit("outcome", {
                    winnerChoice: 2,
                    loserChoice: 2
                });
                socket.broadcast.emit("outcome", {
                    winnerChoice: 2,
                    loserChoice: 2
                });
                winner = "Tie"
            }
            if (choiceOne == 3 && choiceTwo == 3) {
                console.log("Tie!")
                socket.emit("outcome", {
                    winnerChoice: 3,
                    loserChoice: 3
                });
                socket.broadcast.emit("outcome", {
                    winnerChoice: 3,
                    loserChoice: 3
                });
                winner = "Tie"
            }
            if (choiceOne == 1 && choiceTwo == 2) {
                console.log("Paper won!")
                socket.emit("outcome", {
                    winnerChoice: 2,
                    loserChoice: 1
                });
                socket.broadcast.emit("outcome", {
                    winnerChoice: 2,
                    loserChoice: 1
                });
                winner = "Paper"
            }
            if (choiceOne == 1 && choiceTwo == 3) {
                console.log("Rock won!")
                socket.emit("outcome", {
                    winnerChoice: 1,
                    loserChoice: 3
                });
                socket.broadcast.emit("outcome", {
                    winnerChoice: 1,
                    loserChoice: 3
                });
                winner = "Rock"
            }
            if (choiceOne == 2 && choiceTwo == 1) {
                console.log("Paper won!")
                socket.emit("outcome", {
                    winnerChoice: 2,
                    loserChoice: 1
                });
                socket.broadcast.emit("outcome", {
                    winnerChoice: 2,
                    loserChoice: 1
                });
                winner = "Paper"
            }
            if (choiceOne == 2 && choiceTwo == 3) {
                console.log("Scissors won!")
                socket.emit("outcome", {
                    winnerChoice: 3,
                    loserChoice: 2
                });
                socket.broadcast.emit("outcome", {
                    winnerChoice: 3,
                    loserChoice: 2
                });
                winner = "Scissors"
            }
            if (choiceOne == 3 && choiceTwo == 1) {
                console.log("Rock won!")
                socket.emit("outcome", {
                    winnerChoice: 1,
                    loserChoice: 3
                });
                socket.broadcast.emit("outcome", {
                    winnerChoice: 1,
                    loserChoice: 3
                });
                winner = "Rock"
            }
            if (choiceOne == 3 && choiceTwo == 2) {
                console.log("Scissors won!")
                socket.emit("outcome", {
                    winnerChoice: 3,
                    loserChoice: 2
                });
                socket.broadcast.emit("outcome", {
                    winnerChoice: 3,
                    loserChoice: 2
                });
                winner = "Scissors"
            }
            if (choiceOne == 1 && choiceTwo == 0) {
                console.log("Rock won on time!")
                socket.emit("outcome", {
                    winnerChoice: 1,
                    loserChoice: 0
                });
                socket.broadcast.emit("outcome", {
                    winnerChoice: 1,
                    loserChoice: 0
                });
                winner = "Rock"
            }
            if (choiceOne == 2 && choiceTwo == 0) {
                console.log("Paper won on time!")
                socket.emit("outcome", {
                    winnerChoice: 2,
                    loserChoice: 0
                });
                socket.broadcast.emit("outcome", {
                    winnerChoice: 2,
                    loserChoice: 0
                });
                winner = "Paper"
            }
            if (choiceOne == 3 && choiceTwo == 0) {
                console.log("Scissors won on time!")
                socket.emit("outcome", {
                    winnerChoice: 3,
                    loserChoice: 0
                });
                socket.broadcast.emit("outcome", {
                    winnerChoice: 3,
                    loserChoice: 0
                });
                winner = "Scissors"
            }
            datetime = Math.round((new Date()).getTime() / 1000);
            db.run("INSERT INTO History(choiceOne, choiceTwo, result, time) VALUES(?, ?, ?, ?);", [choiceOne, choiceTwo, winner, datetime]);
            db.each("SELECT * FROM History", function(err, row) {
                if (!err) {
                    socket.emit("query", {
                        sqlOne: row.choiceOne,
                        sqlTwo: row.choiceTwo,
                        sqlThree: row.result,
                        sqlFour: row.time
                    });
                    socket.broadcast.emit("query", {
                        sqlOne: row.choiceOne,
                        sqlTwo: row.choiceTwo,
                        sqlThree: row.result,
                        sqlFour: row.time
                    });
                }
            })
            turnOne = true;
            turnTwo = true;
            choiceOne = 0;
            choiceTwo = 0;
        }
    })

    socket.on("restart", function(data) {
        socket.emit("restarted", {});
        socket.broadcast.emit("restarted", {});
    })
})
