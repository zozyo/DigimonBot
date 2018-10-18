var addNumber = require('./addNumber.js');
var db  = require('./db.js');

// Our bot needs to know if it will execute a command
// It will listen for messages that will start with `d!`
exports.cases = function (user, userID, channelID, message, evt, callback) {
	if (message.substring(0, 2) == 'd!') {
		var args = message.substring(2).split(' ');
		var cmd = args[0];
		args = args.splice(1);

		var content = {
			"color": 12345678, 
			"description": "Message!"
		};;

		switch(cmd) {
		// !ping
		case 'ping':
			content = {
				"color": 12345678, 
				"description": "Pong!"
			};
		break;
		// !hello
		case 'hello':
			content = {
				"color": 12345678, 
				"title": "Hello world!"
			};
		break;
		// !logo
		case 'logo':
			content = {
				"color": 12345678,
				"image": {
					"url": "https://vignette.wikia.nocookie.net/doblaje/images/3/3a/Digimon.gif/revision/latest?cb=20150830013427&path-prefix=es"
				}
			};
		break;
		case 'agumon':
			content = {
				"color": 12345678,
				"image": {
					"url": "https://orig00.deviantart.net/20d3/f/2015/347/f/5/digimon_adventure_tri____agumon_render_by_sou_the_cat-d9jzysc.png"
				}
			}
		break;
		case 'greymon':
		content = {
			"color": 12345678,
			"image": {
				"url": "https://vignette.wikia.nocookie.net/digimon-adventure5140/images/c/ca/Greymon_tri.png/revision/latest?cb=20171010042426"
			}
		};
		break;
		case 'myinfo':
			content = {
				"color": 12345678,
				"title": "Your Info",
				"fields": [
					{
						"name": "user",
						"value": user
					},
					{
						"name": "userID",
						"value": userID
					},
					{
						"name": "channelID",
						"value": channelID
					}
				]
			};
		break;
		case 'help':
			content = {
				"color": 12345678,
				"fields": [{
					"name": "Help",
					"value": "Under Construction!"
				}]
			};
		break;
		case 'add':
			content = {
				"color": 12345678,
				"fields": [{
					"name": "Addition Calculator",
					"value": addNumber.add(args[0], args[1])
				}]
			};
		break;
		//testing
		case 'addplayer':
			db.addPlayer(userID);
			content = {
				"color": 12345678, 
				"description": "Added!"
			};
		break;
		case 'l':
			var desc = db.list(function(result){
					desc = result
				})
			content = {
				"color": 14285739, 
				"title": "Players",
				"description": desc
			};
		break;
		// Just add any case commands if you want to..
		default:
			content = {
				"color": 12345678,
				"fields": [{
					"name": "Unknown command!",
					"value": "Try d!help for command list!"
				}]
			};
		}// end of switch
		callback(JSON.stringify(content));
	}// end of if
}//end of cases