//var app = require('express')();
var express = require('express');
var app = express();
var path = require('path');

var http = require('http').Server(app);

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

//websockets
io.on('connection', function(socket){
	console.log('a user connected');
	socket.emit('mensaje de servidor', 5)
})


//gets data from arduino, console.logs that data
port.on('data', function(datos){
	console.log(datos.toString());
	io.emit('masDatos', datos ) //emit 	use broadcast.io.emit
});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');


app.use(express.static( __dirname +'/public'));

app.get('/', function(req, res){
	// console.log(path.join(__dirname,'index.html'));
	res.sendFile(path.join(__dirname, '/public', 'index.html'));
});


http.listen(3000, function(){
	console.log('listening on *:3000');
});

module.exports = app;