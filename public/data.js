console.log('hi');
var socket = io();

var xPos = 0;

//listen for message from server and run function
// socket.on('mensaje de servidor', function(datos){
// 	// console.log('server' + datos);
// });

socket.on('masDatos', function(data){
	console.log(data.light)
	console.log(data.temp)
	if(data.light){
		update1(Number(data.light));
	}
	if(data.temp){
		update2(Number(data.temp));
	};
	
	// console.log(data);
	// update data vis by adding data from sensor to dataset used in update function 
	// dataset.push(data);
	// update();
	// ellipse(xPos%400, data, 10, 10);
	//next get data on view
})

