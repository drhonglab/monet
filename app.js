var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var path    = require('path');

app.use(express.static(path.join(__dirname,"public")));

var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log("server on!: http://localhost:3000/");
});




io.on('connection', function(socket){


socket.on('user', function(data){
   console.log('123');
 io.emit('user','data');

  });

socket.on('star', function(data){
   console.log('12345');
 io.emit('star','data');

  });


console.log('user connected: ', "abc");

socket.on('disconnect', function(){
   console.log('user disconnected: ', "bye");
  });
 
});






