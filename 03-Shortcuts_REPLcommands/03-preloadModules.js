var repl = require("repl");

var context = repl.start(">>", null, null, null, true).context;

// Preload
context.http = require("http");
context.util = require("util");
context.os = require("os");