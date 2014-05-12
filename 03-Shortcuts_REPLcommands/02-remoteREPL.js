var repl = require("repl"),
	net = require("net");

// Configure REPL
repl.start(">>", null, null, null, true);

// Configure listener socket
net.createServer(function(socket) {
	repl.start("remote>>", socket);
}).listen(8124);