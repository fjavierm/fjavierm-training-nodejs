var sys = require('sys');

// timeout easy example - wait to seconds
var start_time = new Date();
sys.puts('Start 2 seconds timer');
setTimeout(function () {
	var end_time = new Date();
	var difference = end_time.getTime() - start_time.getTime();
	sys.puts('Stop the timer after ' + Math.round(difference / 1000) + ' seconds.');
	cleartimeout_example();
}, 2000);

// clearTimeout example - configured timeout with 30s, cancalled instandly through clearTimeout, no output
function cleartimeout_example() {
	var start_time = new Date();
	sys.puts('\nStart 30s timeout and stop it instandly whitout call');
	var timeout = setTimeout(function() {
		var end_time = new Date();
		var difference = end_time.getTime() - start_time.getTime();
		sys.puts('Stop the timer after' + Math.round(difference / 1000) + ' seconds.');
	}, 30000);
	clearTimeout(timeout);
	interval_example();
}

// interval example - 5 outputs with 2 seconds interval
function interval_example() {
	var start_time = new Date();
	sys.puts('\nStarting 2 seconds interval, stop after 5th tick');
	var count = 1;
	var interval = setInterval(function() {
		if (count == 5) {
			clearInterval(this);
		}
		var end_time = new Date();
		var difference = end_time.getTime() - start_time.getTime();
		sys.puts('Tick number: ' + count + ' after ' + Math.round(difference / 1000) + ' seconds.');
		count++;
	}, 2000);
}