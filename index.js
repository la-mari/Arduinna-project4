var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var logger = require( 'morgan' );
var bodyParser = require( 'body-parser' );
var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/sensors';
var http = require('http').Server(app);
var Data = require( './models/data' );

var io = require('socket.io')(http);
//open a serial port for communication to happen
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
// console.log(serialPort);

var port = new SerialPort('/dev/tty.usbmodem1421', {  //dev/tty/usbmodem1421 is the port name
	baudrate: 9600, //configure transmission speed, 9600 baud recommended for arduino projects
	parser: serialport.parsers.readline("\n") //parser, data converted from array buffer to readable data
	});

port.on('open', function(){console.log('connected to arduino')});

var temperatureData = null;

//mongo 'mongodb://localhost/sensors'
mongoose.connect(mongoUrl, function(){
	//Data.remove({}, function(){}); //use to remove all data
	Data.findOne({}, function(err, result){ //find any data
		if(err){
			console.log(err)
		};
		if(result){ //if data found, set that to temperatureData
			console.log('the result is', result);
			temperatureData = result;
			console.log(temperatureData);
		}else{ //if no data create a new object based on schema
			temperatureData = new Data({values: [], updatedAt: Date.now()});
			console.log(temperatureData);
		}
	});
});

//to check if connection with client established console.log serverside
// io.on('connection', function(socket){
// 	console.log('a user connected');
// 	socket.emit('mensaje de servidor', 5) //on connection send message through the socket
// })


//Gets data from arduino
port.on('data', function(datos){
	var newData = datos.toString().split("-")
	//get each element from newData array and assign it to separate variable
	var temp = newData[0]
	var slide = newData[1]
	var light = newData[2]
	var joy = newData[3].replace(/(\r)/gm,"")
	//console.log(newData)
	//console.log(temp + "degrees" + slide + "slider" + light + "lumens" + joy + "xDistance"); //logs server side
	
	//take temp reading from sensor 
	//push to values array in schema
	Data.findByIdAndUpdate(
	    temperatureData.id,
	    {$push: {values: {reading: temp, date: Date.now()}}}, 
	    {safe: true, upsert: true},
	    function(err, model) {
	        if (err){
	        	console.log(err)
	        };
	        // console.log(model );
	    }
	);
	//emit data from sensor to client
	io.emit('masDatos', {temp: temp, slide: slide, light: light, joy: joy} ) 	
});


app.use(express.static( __dirname +'/public'));
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );

app.get('/', function(req, res){
	// console.log(path.join(__dirname,'index.html'));
	res.sendFile(path.join(__dirname, '/public', 'index.html'));
});


http.listen(3000, function(){
	console.log('listening on *:3000');
});

module.exports = app;