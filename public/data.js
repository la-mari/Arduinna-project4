console.log('hi');
var socket = io();

//listen for message from server and run function
// socket.on('mensaje de servidor', function(datos){
// 	// console.log('server' + datos);
// });

socket.on('masDatos', function(data){
	console.log(data.slide)
	console.log(data.temp)
	console.log(data.light)
	console.log(data.joy)
	if(data.light){
		update1(Number(data.slide));
	}
	if(data.temp){
		update2(Number(data.temp));
	};
	if(data.light){
		update3(Number(data.light));
	};
	if(data.joy){
		update4(Number(data.joy));
	};
})

