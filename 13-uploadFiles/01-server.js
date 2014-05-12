var http = require('http');
var formidable = require('formidable'); // npm install formidable@1.x.x
var form = require('fs').readFileSync('form.html');

http.createServer(function(request, response) {
	if (request.method === 'POST') {
		var incoming = new formidable.IncomingForm(); // Formidable object manages events
		incoming.uploadDir = 'uploads';
		incoming.on('fileBegin', function(field, file) {
			if (file.name) {
				file.path += "-" + file.name;
			}
		}).on('file', function(field, file) {
			if (!file.size) {
				return;
			}
			response.write(file.name + ' uploaded\n');
		}).on('end', function() {
			response.end('All files uploaded.');
		});
		incoming.parse(request);
	}

	if (request.method === 'GET') {
		response.writeHead(200, { 'Content-Type': 'text/html'});
		response.end(form);
	}

}).listen(8080);
console.log('Server running ...')