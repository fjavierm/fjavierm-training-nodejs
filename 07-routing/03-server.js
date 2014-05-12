// Multilevel route - URL module

var http = require('http');
var url = require('url');

var pages = [
	{id: 1, route: '', output: 'Working...'},
	{id: 2, route: 'about', output: 'Simple route example.'},
	{id: 3, reoute: 'other', output: function() { return 'We are in ' + this.route; } }
];

http.createServer(function(request, response) {
	var id = url.parse(decodeURI(request.url), true).query.id; // Using queryString

	if (id) {
		pages.forEach(function(page) {
			if (page.id === id) {
				response.writeHead(200, { 'Content-Type': 'text/html'});
				response.end(typeof page.output === 'function' ? page.output() : page.output);
			}
		});
	}

	if (!response.finished) {
		response.writeHead(404);
		response.end('Page not found.');
	}
	
}).listen(8080);

console.log('Server started in http://localhost:8080 ...');