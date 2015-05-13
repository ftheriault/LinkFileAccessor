/**
	main file

	Starts the WebSocket server.

	@author 	Frederic Theriault
*/


var WsServerWrapper = require('./WsServerWrapper');
var wsServer = new WsServerWrapper(8081);


console.log("------------------------------------");
console.log("     Link File Accessor loaded.");
console.log("------------------------------------");
console.log("");
