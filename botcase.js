//requires
var addNumber = require('./addNumber.js');
var db = require('./db.js');

// Our bot needs to know if it will execute a command
// It will listen for messages that will start with `d!`
exports.Cases = function() {
	// ping
	var ping = function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678, 
			"description": "Pong!"
		};
		callback(content);
	}

	//hello
	var hello = function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678, 
			"title": "Hello world!"
		};
		callback(content)
	}

	//logo
	var logo = function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://vignette.wikia.nocookie.net/doblaje/images/3/3a/Digimon.gif/revision/latest?cb=20150830013427&path-prefix=es"
			}
		};
		callback(content);
	}

	//testing images
	var agumon = function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://orig00.deviantart.net/20d3/f/2015/347/f/5/digimon_adventure_tri____agumon_render_by_sou_the_cat-d9jzysc.png"
			}
		};
		callback(content);
	}

	var greymon = function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://vignette.wikia.nocookie.net/digimon-adventure5140/images/c/ca/Greymon_tri.png/revision/latest?cb=20171010042426"
			}
		};
		callback(content);
	}

	// show user info for future use in database
	var myinfo = function(user, userID, channelID, args, callback){
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
	}

	// help menu
	var help = function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"fields": [{
				"name": "Help",
				"value": "Under Construction!"
			}]
		};
		callback(content);
	}

	// Addition Calculator, testing for require
	var add = function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"fields": [{
				"name": "Addition Calculator",
				"value": addNumber.add(args[0], args[1])
			}]
		};
		callback(content);
	}

	// temporary database insert
	var addplayer = function(user, userID, channelID, args, callback){
		db.addPlayer(userID, function(result){
			var content = {
				"color": 12345678,
				"title": "addplayer",
				"description": result
			};
			callback(content)
		});
	}

	// temporary database search
	var listplayer = function(user, userID, channelID, args, callback){
		db.listPlayer(function(result){
			var content = {
				"color": 14285739, 
				"title": "listplayer",
				"description": result
			};
			callback(content)
		});
	}

	//temporary database delete
	var deleteplayer = function(user, userID, channelID, args, callback){
		db.deletePlayer(userID, function(result){
			var content = {
				"color": 12345678, 
				"title": "deleteplayer",
				"description": result
			};
			callback(content)
		});
	}
}// end of cases