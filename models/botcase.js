//requires
var dbp = require('./db_player.js')
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

	//logo https://vignette.wikia.nocookie.net/doblaje/images/3/3a/Digimon.gif/revision/latest?cb=20150830013427&path-prefix=es

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

	//adddigimon name HP Atk Def picURL
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

	//setdigimondv name DV1 DV2 DV3 DV4
	setdigimondv: function(userID, userID,channelID, args, callback){
		dbd.setDigimonDV(userID, args, function(result){
			var content = {
				"color": 12345678,
				"title": "setdigimondv",
				"description": result
			};
			callback(content)
		})
	},

	//showdigimon name
	showdigimon: function(userID, userID,channelID, args, callback){
		dbd.showDigimon(userID, args, function(result){
			var content = {
				"color": 12345678,
				"title": "searchdigimon",
				"fields": [
					{
						"name": "name",
						"value": result[0]["name"]
					},
					{
						"name": "HP",
						"value": result[0]["HP"]
					},
					{
						"name": "Atk",
						"value": result[0]["Atk"]
					},
					{
						"name": "Def",
						"value": result[0]["Def"]
					}
				],
				"image": {
					"url": result[0]["picURL"]
				}
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

	//deletedigimon name
	deletedigimon: function(user, userID, channelID, args, callback){
		dbd.deleteDigimon(userID, args, function(result){
			var content = {
				"color": 12345678, 
				"title": "deletedigimon",
				"description": result
			};
			callback(content)
		});
	}
	//add more
}// end of cases