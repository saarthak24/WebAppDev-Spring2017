//imports
var express = require("express")();
var http = require("http").Server(express);
//set up express calls
express.get("/",function(request, response){
    //response.write("Hello!")
    response.sendFile('/Labs/index.html', { root: __dirname + '/../../' })
    console.log("Someone entered")
})
//http listen
http.listen(process.env.PORT, process.env.IP,function(){
    console.log("The server has started")
})
