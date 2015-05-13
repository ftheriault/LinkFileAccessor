/**
	WebSocket server

	This is a wrapper for a WebSocket server, listening on a wanted port. It creates
	wsClients when a new connection is set.

	@author 	Frederic Theriault
*/


var WebSocketServer = require('ws').Server;
var WsClient = require("./WsClient");

module.exports = WsServerWrapper = function (wsPort) {
	this.wss = new WebSocketServer({ port: wsPort });
	this.clients = [];
	var wsServer = this;

	this.wss.on('connection', function connection(ws) {
		var wsClient = new WsClient(ws);

		ws.on('message', function incoming(message) {
			wsClient.messageRecieved(message);
		});

		ws.on('close', function() {
			wsClient.connectionClosed();
			wsServer.clients.splice(wsServer.clients.indexOf(wsClient), 1);
		});		

		wsServer.clients.push(wsClient);
	});
}