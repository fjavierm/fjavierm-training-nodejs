// Basic route

var http = require('http');
var path = require('path');

var pages = [
	{route: '', output: 'Working...'},
	{route: 'about', output: 'Simple route example.'},
	{route: 'other', output: function() { return 'We are in ' + this.route; } }
];

http.createServer(function(request, response) {
	var search = path.basename(decodeURI(request.url));

	pages.forEach(function(page) {
		if (page.route === search) {
			response.writeHead(200, { 'Content-Type': 'text/html'});
			response.end(typeof page.output === 'function' ? page.output() : page.output);
		}
	});

	if (!response.finished) {
		response.writeHead(404);
		response.end('Page not found.');
	}
	
}).listen(8080);

console.log('Server started in http://localhost:8080 ...');