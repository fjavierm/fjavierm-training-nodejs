var http = require('http');

http.createServer(function(req, res) {
	res.writeHead(200, { 'content-type': 'text/plain'});

	res.end("Hello World!");
}).listen(8124);

console.log('Server listening at http://localhost:8124')