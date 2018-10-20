//requires
var addNumber = require('./addNumber.js')
	, dbp = require('./db_player.js')
	, dbd = require('./db_digimon.js');

// Our bot needs to know if it will execute a command
// It will listen for messages that will start with `d!`
module.exports = {
	// ping
	ping: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678, 
			"description": "Pong!"
		};
		callback(content);
	},

	//hello
	hello: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678, 
			"title": "Hello world!"
		};
		callback(content)
	},

	//logo
	logo: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://vignette.wikia.nocookie.net/doblaje/images/3/3a/Digimon.gif/revision/latest?cb=20150830013427&path-prefix=es"
			}
		};
		callback(content);
	},

	//testing images
	agumon: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://orig00.deviantart.net/20d3/f/2015/347/f/5/digimon_adventure_tri____agumon_render_by_sou_the_cat-d9jzysc.png"
			}
		};
		callback(content);
	},

	greymon: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://vignette.wikia.nocookie.net/digimon-adventure5140/images/c/ca/Greymon_tri.png/revision/latest?cb=20171010042426"
			}
		};
		callback(content);
	},

	// show user info for future use in database
	myinfo: function(user, userID, channelID, args, callback){
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
	},

	// help menu
	help: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"fields": [{
				"name": "Help",
				"value": "Under Construction!"
			}]
		};
		callback(content);
	},

	// Addition Calculator, testing for require
	add: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"fields": [{
				"name": "Addition Calculator",
				"value": addNumber.add(args[0], args[1])
			}]
		};
		callback(content);
	},

	// temporary database insert
	addplayer: function(user, userID, channelID, args, callback){
		dbp.addPlayer(userID, function(result){
			var content = {
				"color": 12345678,
				"title": "addplayer",
				"description": result
			};
			callback(content)
		});
	},

	// temporary database search
	listplayer: function(user, userID, channelID, args, callback){
		dbp.listPlayer(function(result){
			var content = {
				"color": 14285739, 
				"title": "listplayer",
				"description": result
			};
			callback(content)
		});
	},

	//temporary database delete
	deleteplayer: function(user, userID, channelID, args, callback){
		dbp.deletePlayer(userID, function(result){
			var content = {
				"color": 12345678, 
				"title": "deleteplayer",
				"description": result
			};
			callback(content)
		});
	},

	//adddigimon
	adddigimon: function(userID, userID,channelID, args, callback){
		dbd.addDigimon(userID, args, function(result){
			var content = {
				"color": 12345678,
				"title": "adddigimon",
				"description": result
			};
			callback(content)
		})
	},

	//listdigimon
	listdigimon: function(user, userID, channelID, args, callback){
		dbd.listDigimon(function(result){
			var content = {
				"color": 14285739, 
				"title": "listdigimon",
				"description": result
			};
			callback(content)
		});
	},

	//add more
}// end of cases