Shortcuts:
	CTRL+C: Finish command execution. If two times, REPL exit.
	CTRL+D: REPL exit.
	TAB: Global and local variable autocompletation.
	CURSOR UP: Backward in executed command list.
	CURSOR DOWN: Fordward in executed command list.
	_: Reference last result.

Commands:
	.save: Save actual REPL session in a file.
	.break: Restart REPL session.
	.clear: Restart REPL context. Similar to REPL restart.
	.exit: Exit from REPL.
	.help: Show available commands on REPL.
	.load: Load a file with a previouse REPL session saved.
	repl.start([options]): Initialize a new repl object.
		Options:	prompt: Default value is ">".
					stream: Default value is process.stdin.
					eval: Default value is the async default container for eval.
					useGlobal: Default value is false. Start a new context instead of use the global object.
					IgnoreDefined: Default value false. Doesn't ignore undefined answers.