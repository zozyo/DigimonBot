var addNumber = require('./addNumber.js');
//var db        = require('./db.js');

// Our bot needs to know if it will execute a command
// It will listen for messages that will start with `d!`
exports.case = function (user, userID, channelID, message, evt) {
	if (message.substring(0, 2) == 'd!') {
		var args = message.substring(2).split(' ');
		var cmd = args[0];
		args = args.splice(1);

		var content = {};
		switch(cmd) {
		// !ping
		case 'ping':
			content = {
				color: 6826080,
				message: 'Pong!'  
			};
		break;
		// !hello
		case 'hello':
			content = {
				message: 'Hello world!'
			};
		break;
		// !logo
		case 'logo':
			content = {
				image: {
					'url': './logo.jpg'
				},
			};
		break;
		case 'myinfo':
			content = {
				color: 6826080,
				fields: [{
					name: 'Your info',
					value: 'user: '      + user + '\n' +
							'userID: '    + userID + '\n' +
							'channelID: ' + channelID
				}],
			};
		break;
		case 'help':
			content = {
				message: 'Under Construction!'
			};
		break;
		case 'add':
			content = {
				message: addNumber.add(args[0], args[1])
			};
		break;
		// Just add any case commands if you want to..
		default:
			content = {
				message: 'Unknown command! Try d!help for command list!'
			};      
		}// end of switch
	}// end of if
	return content;
}//end of cases