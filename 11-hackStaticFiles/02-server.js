/* NOT FOR PRODUCTION ENVIRONMENTS */

var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

http.createServer(function (resquest, response) {
	var lookup = url.parse(decodeURI(resquest.url)).pathname;
	var f = 'content';

	lookup = path.normalize(lookup); // Normalizing the url content
	lookup = (lookup === '/') ? 'index.html' : lookup;
	f += lookup;
	
	fs.readFile(f, function(err, data) {
		response.end(data);
	});
	
}).listen(8080);