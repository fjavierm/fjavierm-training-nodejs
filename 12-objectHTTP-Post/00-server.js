var http = require('http');
var querystring = require('querystring');
var util = require('util');
var form = require('fs').readFileSync('form.html');

var maxData = 12 * 1024 * 1024; // 12 mb

http.createServer(function(request, response) {
	if (request.method === 'POST') {
		var postData = '';
		request.on('data', function(chunk) {
			postData += chunk;
			if (postData.lenght > maxData) { // DDoS protection
				postData = '';
				this.pause();
				response.writeHead(413); // Too long request
				response.write("Too long");
			}
		}).on('end', function() {
			if (!postData) { // Empty requests
				response.end();
				return;
			}
			var postDataObject = querystring.parse(postData);
			console.log('User has writen: ' + postData);
			response.end('You have writen : ' + util.inspect(postDataObject));
		});
		return;
	}

	if (request.method === 'GET') {
		response.writeHead(200, { 'Content-Type': 'text/html'});
		response.end(form);
	}

}).listen(8080);