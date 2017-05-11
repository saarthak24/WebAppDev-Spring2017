var express = require("express");
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

app.get("/", function(request, response) {
    response.sendFile('index.html', {root: __dirname})
})

io.on("connection", function(socket){
    socket.on("message", function(data){
        console.log(data)
    })
})
