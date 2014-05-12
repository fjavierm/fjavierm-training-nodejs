var http = require('http'),
	path = require('path'),
	fs   = require('fs');

var mimeTypes = {
	'.js': 'text/javascript',
	'.html': 'text/html',
	'.css': 'text/css'
};

http.createServer(function(request, response) {
	var search = path.basename(decodeURI(request.url)) || 'index.html';

	f = 'content/' + search;

	fs.exists(f, function(exists) {
		if (exists) {
			fs.readFile(f, function(err, data) {
				if (err) {
					response.writeHead(500);
					response.end('Server error');
					return;
				}

				var headers = { 'Content-Type': mimeTypes[path.extname(search)] };

				response.writeHead(200, headers);
				response.end(data);
			});

			return;
		}
		
		response.writeHead(404);
		response.end('Page not found');
	});

}).listen(8080);

console.log('Server running in localhost:8080...')