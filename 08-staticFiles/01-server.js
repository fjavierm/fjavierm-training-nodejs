var http = require('http'),
	path = require('path'),
	fs   = require('fs');

http.createServer(function(request, response) {
	var search = path.basename(decodeURI(request.url)) || 'index.html';

	f = 'content/' + search;

	fs.exists(f, function(exists) {
		console.log(exists ? search + ' exists' : search + ' does not exist');
	});

}).listen(8080);

console.log('Server running in localhost:8080...')