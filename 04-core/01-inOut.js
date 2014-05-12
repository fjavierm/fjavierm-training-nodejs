process.stdin.resume(); // Start
process.stdin.on('data', function(chunk) {
	process.stdout.write('data: ' + chunk);
});