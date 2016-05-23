var SerialPort = require('serialport').SerialPort;
// console.log(serialPort);

var port = new SerialPort('/dev/tty.usbmodem1421', {baudrate: 9600});
port.on('open', function(){console.log('connected to arduino')});

port.on('data', function(datos){
	console.log(datos.toString());
	
});