var http = require('http'),
	path = require('path'),
	fs   = require('fs');

var mimeTypes = {
	'.js': 'text/javascript',
	'.html': 'text/html',
	'.css': 'text/css'
};

var cache = {};

function cacheAndDelivery(f, cb) {
	fs.stat(f, function(err, stats) {
		var lastChange = Date.parse(stats.ctime),
			isUpdated = (cache[f]) && lastChange > cache[f].timestamp;

		if (!cache[f] || isUpdated) {
			fs.readFile(f, function(err, data) {
				console.log('loading ' + f + ' from file.');
				if (!err) {
					cache[f] = { content: data, timestamp: Date.now() };
				}
				cb(err, data);
			});
			return;
		}

		console.log('loading ' + f + ' from cache.');
		cb(null, cache[f].content);
	});
}

http.createServer(function(request, response) {
	var search = path.basename(decodeURI(request.url)) || 'index.html';

	f = 'content/' + search;

	fs.exists(f, function(exists) {
		if (exists) {
			cacheAndDelivery(f, function (err, data) {
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