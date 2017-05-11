var express = require("express")
var app = express();
var server = app.listen(3000);
console.log('Listening on 3000')
console.log('http://localhost:3000/')

app.get("/", function(request, response) {
    response.sendFile('form.html', {
        root: __dirname
    })
})
app.get("/receiveData", function(request, response) {
    console.log(request.query);
    response.end("Your data has been received");
    //take the request and add to DB
    //Send all of our data back to the client.
})

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("day1Test.db");

db.each("SELECT * FROM Students", function(err, row) {
    if (!err) {
        //console.log(row);
        //console.log(row.name + " is in grade " + row.grade);
    }
})
