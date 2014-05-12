/* NOT FOR PRODUCTION ENVIRONMENTS */

var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

http.createServer(function (resquest, response) {
	var lookup = url.parse(decodeURI(resquest.url)).pathname;
	var f = 'content2';

	lookup = (lookup === '/') ? 'index.html-serve' : lookup + '-serve'; // Pseudo secure (poison null byte)

	f += lookup;
	console.log(f);

	fs.exists(f, function(exists) {
		if (!exists) {
			response.writeHead(404);
			response.end('Page not found.\n');
			return;
		}

		fs.readFile(f, function(err, data) {
			response.end(data);
		});
	});
	
}).listen(8080);