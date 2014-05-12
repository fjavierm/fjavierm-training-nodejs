var static = require('../lib/node-static');

var file = new (static.Server)('.', { cache: 7200, headers: {'X-Hello': 'Wrold!'} });

require('http').createServer(function(request, response) {
	request.addListener('end', function() {
		file.serve(request, response, function(err, res) {
			if (err) {
				console.error('> Error serving ' + request.url + ' - ' + err.message);
				response.writeHead(err.status, err.headers);
				response.end();
			} else {
				console.log('> ' + request.url + ' - ' + res.message);
			}
		});
	});
}).listen(8080);