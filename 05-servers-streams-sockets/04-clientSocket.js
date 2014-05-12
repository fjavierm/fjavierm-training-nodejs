var net = require('net');

var client = new net.Socket();
client.setEncoding('utf8');

client.connect('8124', 'localhost', function() {
	console.log('Connected to the server...');
	client.write('We have connection without browser.');
});

process.stdin.resume();

process.stdin.on('data', function(data) {
	client.write(data);
});

client.on('data', function(data) {
	console.log(data);
});

client.on('close', function() {
	console.log('Connection has been closed.')
})