//imports
var express = require("express");
var path = require('path');
var app = express();
//set up express calls
app.get("/", function(request, response) {
    response.sendFile('index.html', {root: __dirname + '/../'})
})
app.get("/Lab0_Content/index.html", function(request, response) {
    response.sendFile('index.html', {root: __dirname + '/../Lab0_Content'})
})
app.get("/Lab1_Content/index.html", function(request, response) {
    response.sendFile('index.html', {root: __dirname + '/../Lab1_Content'})
})
app.get("/Lab2_Content/index.html", function(request, response) {
    response.sendFile('index.html', {root: __dirname + '/../Lab2_Content'})
})
app.get("/Lab3_Content/index.html", function(request, response) {
    response.sendFile('index.html', {root: __dirname + '/../Lab3_Content'})
})
app.get("/Lab5_Content/index.html", function(request, response) {
    response.sendFile('index.html', {root: __dirname + '/../Lab5_Content'})
})
app.get("/Lab6_Content/index.html", function(request, response) {
    response.sendFile('index.html', {root: __dirname + '/../Lab6_Content'})
})
app.use('/', express.static(path.join(__dirname, '/../')))
//http listen
app.listen(3000, function() {
  console.log('Listening on 3000')
  console.log('http://localhost:3000/')
})
