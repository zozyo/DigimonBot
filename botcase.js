var addNumber 	= require('./addNumber.js'),
	db  		= require('./db.js'),
	routes 		= require('./routes');

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
			var content = {
				"color": 12345678, 
				"description": "Pong!"
			};
			callback(content);
		break;
		// !hello
		case 'hello':
			var content = {
				"color": 12345678, 
				"title": "Hello world!"
			};
			callback(content);
		break;
		// !logo
		case 'logo':
			var content = {
				"color": 12345678,
				"image": {
					"url": "https://vignette.wikia.nocookie.net/doblaje/images/3/3a/Digimon.gif/revision/latest?cb=20150830013427&path-prefix=es"
				}
			};
			callback(content);
		break;
		case 'agumon':
			var content = {
				"color": 12345678,
				"image": {
					"url": "https://orig00.deviantart.net/20d3/f/2015/347/f/5/digimon_adventure_tri____agumon_render_by_sou_the_cat-d9jzysc.png"
				}
			}
			callback(content);
		break;
		case 'greymon':
			var content = {
				"color": 12345678,
				"image": {
					"url": "https://vignette.wikia.nocookie.net/digimon-adventure5140/images/c/ca/Greymon_tri.png/revision/latest?cb=20171010042426"
				}
			};
			callback(content);
		break;
		case 'myinfo':
			var content = {
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
			callback(content);
		break;
		case 'help':
			var content = {
				"color": 12345678,
				"fields": [{
					"name": "Help",
					"value": "Under Construction!"
				}]
			};
			callback(content);
		break;
		case 'add':
			var content = {
				"color": 12345678,
				"fields": [{
					"name": "Addition Calculator",
					"value": addNumber.add(args[0], args[1])
				}]
			};
			callback(content);
		break;
		//testing
		case 'addplayer':
			db.addPlayer(userID);
			var content = {
				"color": 12345678, 
				"description": "Added!"
			};
			callback(content);
		break;
		case 'listplayer':
			db.listPlayer(function(result){
				var content = {
					"color": 14285739, 
					"title": "Players",
					"description": result
				};
				callback(content);
			})
		break;
		// Just add any case commands if you want to..
		default:
			var content = {
				"color": 12345678,
				"fields": [{
					"name": "Unknown command!",
					"value": "Try d!help for command list!"
				}]
			};
			callback(content);
		}// end of switch
	}// end of if
}//end of cases