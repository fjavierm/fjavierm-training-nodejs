var net = require('net');

var server = net.createServer(function(conn) {
	console.log('Connected...');

	conn.on('data', function(data) {
		console.log(data + ' from ' + conn.remoteAddress + ' ' + conn.remotePort);
		conn.write('Repeat: ' + data);
	});

	conn.on('close', function() {
		console.log('Client closes connection.')
	});
}).listen(8124);

console.log('Listening in port 8124...')