var http = require('http'),
	path = require('path'),
	fs   = require('fs');

var mimeTypes = {
	'.js': 'text/javascript',
	'.html': 'text/html',
	'.css': 'text/css'
};

var cache = {
	store: {},
	maxSize: 26214400, // (bytes) 25mb
	maxAge: 5400 * 1000, // (ms) 1 and a half hours
	cleanAfter: 7200 * 1000, // (ms) two hours
	cleanedAt: 0, // to be set dynamically
	clean: function(now) {
		if (now - this.cleanAfter > this.cleanedAt) {
			console.log('Cleaning object...');
			this.cleanedAt = now;
			Object.keys(this.store).forEach(function(file) {
				if (now > that.store[file].timestamp + that.maxAge) {
					delete that.store[file];
				}
			});
		}
	}
};

http.createServer(function(request, response) {
	var search = path.basename(decodeURI(request.url)) || 'index.html';

	f = 'content/' + search;

	fs.exists(f, function(exists) {
		if (exists) {
			var headers = { 'Content-Type': mimeTypes[path.extname(f)] };

			if (cache[f]) {
				console.log('From cache');
				response.writeHead(200, headers);
				response.end(cache[f].content);

				return;
			}

			console.log('From server');

			var s = fs.createReadStream(f, { bufferSize: 128 * 1024 }).once('open', function() { // Default buffer size 64 kb
				response.writeHead(200, headers);
				this.pipe(response);
			}).once('error', function(e) {
				console.log(e);
				response.writeHead(500);
				response.end('Server error');
			});

			fs.stat(f, function(err, stats) {
				if (stats.size < cache.maxSize) {
					var bufferOffset = 0;

					cache.store[f] = { content: new Buffer(stats.size),
						timestamp: Date.now() };

					s.on('data', function(chunk) {
						chunk.copy(cache.store[f].content, bufferOffset);
						bufferOffset += chunk.length;
					});
				}
			});

			return;
		}
		
		response.writeHead(404);
		response.end('Page not found');
	});

	cache.clean(Date.now());

}).listen(8080);

console.log('Server running in localhost:8080...')