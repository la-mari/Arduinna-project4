console.log('hi');
var socket = io();

var xPos = 0;

function setup(){
	var myCanvas = createCanvas(400, 400);
	// $('canvas').attr('id', 'canvasStyling');
}


function draw(){
	background('rgba(255, 255, 255, 0.1)');
	xPos++;
}

//listen for message from server and run function
socket.on('mensaje de servidor', function(datos){
	console.log('server' + datos);
});

socket.on('masDatos', function(data){
	console.log(data);
	// update d3 data
	// dataset.push(data);
	// rerender
	// update();
	ellipse(xPos%400, data, 10, 10);
	//next get data on view
})

