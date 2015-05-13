/**
	WebSocket Client

	Client socket, triggering wanted actions upon web socket events.

	@author 	Frederic Theriault
*/

var path = require('path')
var fs = require("fs");

module.exports = WsClient = function(ws) {
	this.ws = ws;

	this.messageRecieved = function (message) {
		var msg = JSON.parse(message);

		if (msg.type == "read") {
			var files = this.scanDirectory(msg.dir, msg.validExtensions, 4);
			
			this.send({
					type : "result",
					files : files
				});
			console.log("-- Finished reading and sending files.");
		}
	}

	this.connectionClosed = function () {
		
	}

	this.send = function (message) {
		this.ws.send(JSON.stringify(message));
	}

	this.scanDirectory = function(dir, validExtensions, depth) {
		var files = fs.readdirSync(dir); 
		var filesToReturn = [];

		for (var i in files) {
			var file = files[i];
			var fullPath = dir + "/" + file;
			var stats = fs.statSync(fullPath);

			if (stats.isFile() && validExtensions.indexOf(path.extname(file)) >= 0) {
				filesToReturn.push(this.readFileInfo(fullPath));
			}
			else if (stats.isDirectory() && depth >= 0) {
				var tmpArray = this.scanDirectory(fullPath, validExtensions, depth - 1);
				filesToReturn.concat(tmpArray);
			}
		}

		return  filesToReturn;
	}

	this.readFileInfo = function(filePath, fileName) {
		data = fs.readFileSync(filePath, {encoding: 'utf-8'});

		var fileInfo = {
			filePath : filePath,
			fileName : fileName,
			extension : path.extname(fileName),
			content : data
		}; 

		console.log(" - Found : " + filePath);

		return fileInfo;
	}
}
