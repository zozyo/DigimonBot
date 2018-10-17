var addNumber = require('./addNumber.js');
//var db        = require('./db.js');

// Our bot needs to know if it will execute a command
// It will listen for messages that will start with `d!`
exports.cases = function (user, userID, channelID, message, evt, callback) {
	if (message.substring(0, 2) == 'd!') {
		var args = message.substring(2).split(' ');
		var cmd = args[0];
		args = args.splice(1);

		switch(cmd) {
		// !ping
		case 'ping':
			var fields1 = {"value": 'Pong!'};
			var content = {"color": 12345678, "fields": fields1};
		break;
		// !hello
		case 'hello':
			var content = {"color": 12345678, "title": 'Your Info'};
		break;
		// !logo
		case 'logo':
			content = {
				"color": 12345678,
				"image": {
					"url": "./logo.jpg"
				},
			};
		break;
		case 'myinfo':
			content = {
				"color": 12345678,
				"title": 'Your Info',
				"fields": [
					{
						"name": 'user',
						"value": user
					},
					{
						"name": 'userID',
						"value": userID
					},
					{
						"name": 'channelID',
						"value": channelID
					},
					{
						"name": 'evt',
						"value": evt
					},
				],
			};
		break;
		case 'help':
			content = {
				"color": 12345678,
				"fields": [{
					"value": 'Under Construction!'
				}],
			};
		break;
		case 'add':
			content = {
				"color": 12345678,
				"fields": [{
					"value": addNumber.add(args[0], args[1])
				}],
			};
		break;
		// Just add any case commands if you want to..
		default:
			content = {
				"color": 12345678,
				"fields": [{
					"value": 'Unknown command! Try d!help for command list!'
				}],
			};
		}// end of switch
	}// end of if
	
	callback(content);
}//end of cases