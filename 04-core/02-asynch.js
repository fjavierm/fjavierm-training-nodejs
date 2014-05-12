function asynchFunction = function (data, callback) {
	process.nextTick( function() { // ~ JS setTimeOut(1ms)
		callback(val);
	});
};