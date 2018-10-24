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

	//logo https://i.loli.net/2018/10/25/5bd0e3adec2a2.gif

	// show user info
	myinfo: function(user, userID, channelID, args, callback){
		dbp.showPlayer(user, userID, function(result){
			console.log(result);
			if(result != null){
				var content = {
					"color": 12345678,
					"title": "Player " + user + " Info",
					"fields": [
						{
							"name": "Digimon Name",
							"value": result["digimonName"]
						},
						{
							"name": "Level",
							"value": result["level"]
						},
						{
							"name": "XP",
							"value": result["XP"] + "/" + result["maxXP"]
						},
						{
							"name": "HP",
							"value": result["HP"]
						},
						{
							"name": "Atk",
							"value": result["Atk"]
						},
						{
							"name": "Def",
							"value": result["Def"]
						}
					],
					"image": {
						"url": result["picURL"]
					}
				};
				callback(content);
			} else {
				callback("You haven't chosen any digimon yet! Type d!choose [digimon] to choose one!");
			}
			
		});
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

	// choose digimonName
	choose: function(user, userID, channelID, args, callback){	
		dbd.showDigimon(userID, args, function(result){
			dbp.addPlayer(userID, result,function(result){
				var content = {
					"color": 12345678,
					"title": "addplayer",
					"description": result
				};
				callback(content)
			})
		});
	},

	//for testing
	// listplayer
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

	// deleteme
	deleteme: function(user, userID, channelID, args, callback){
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
						"name": "Digimon Name",
						"value": result["name"]
					},
					{
						"name": "HP",
						"value": result["HP"]
					},
					{
						"name": "Atk",
						"value": result["Atk"]
					},
					{
						"name": "Def",
						"value": result["Def"]
					}
				],
				"image": {
					"url": result["picURL"]
				}
			};
			callback(content)
		})
	},

	//for testing
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