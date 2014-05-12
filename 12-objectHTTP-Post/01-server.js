var connect = require('connect'); // it should be install. npm install connect
var util = require('util');
var form = require('fs').readFileSync('form.html');

connect(connect.limit('640kb'), connect.bodyParser(), function(request, response) {
	if (request.method === 'POST') {
		console.log('User has writen: ' + request.body);
		response.end('You have writen : ' + util.inspect(request.body));
	}

	if (request.method === 'GET') {
		response.writeHead(200, { 'Content-Type': 'text/html'});
		response.end(form);
	}
}).listen(8080);