/**
1. show express module
node package manager to add the module and update the dependencies:
- npm install express --save
2. work on animation
*/


//Imporing express, creating express object
var express = require('express');
var	app = express();
var http = require('http');	
var bodyParser = require('body-parser');
var server = http.createServer(app);
var io = require('socket.io').listen(server);	
var io2 = require('socket.io-client');

var Client = require('node-rest-client').Client;
client = new Client();	
var args = {
	data: {"destUrl": "http://130.230.147.111:8080/sendMeNotification"},
	headers:{"Content-Type": "application/json"} 
};

//http://130.230.141.228:3000/RTU/ROB7/events/PalletLoaded/notifs
//http://130.230.141.228:3000/RTU/CNV5/events/Z1_Changed/notifs

client.post("http://130.230.141.228:3000/RTU/CNV5/events/Z1_Changed/notifs", args, function(data,response) {	
	console.log(JSON.parse(data));    
});	

client.post("http://130.230.141.228:3000/RTU/CNV5/events/Z2_Changed/notifs", args, function(data,response) {	
	console.log(JSON.parse(data));    
});	

client.post("http://130.230.141.228:3000/RTU/CNV5/events/Z3_Changed/notifs", args, function(data,response) {	
	console.log(JSON.parse(data));    
});	

client.post("http://130.230.141.228:3000/RTU/CNV5/events/Z4_Changed/notifs", args, function(data,response) {	
	console.log(JSON.parse(data));    
});	

client.post("http://130.230.141.228:3000/RTU/CNV5/events/Z5_Changed/notifs", args, function(data,response) {	
	console.log(JSON.parse(data));    
});	

app.use(bodyParser());	
	
app.post('/sendMeNotification', function(req, res) {
	
   console.log(req.body);
   io.sockets.emit('NotificationData',req.body);
   
});	


	
//Defining a route from localhost:8080/ to ./client/III Assignment.html
app.get('/', function(req, res){
	res.sendFile(__dirname + '/III Assignment.html');
});


//Defining resource filter from /js/** to ./client/js/**
app.use('/js', express.static(__dirname +'/js'))

//Running server on port 8080. On started executin logging function.
//A typical example of async function call.

server.listen(8080, function(){
	console.log('Started on port 8080...');
});

