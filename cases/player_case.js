//requires
var dbPlayer = require('../models/db_player.js')
	,dbDigimon = require('../models/db_digimon.js');

//player cases
module.exports = {
	//ping
	ping: function(callback){
		var content = {
			"color": 12345678, 
			"description": "Pong!",
			"footer": {
				"text": Date.toUTCString()
			}
		};
		callback(content);
	},

	//start
	start: function(userID, callback){
		dbPlayer.showPlayer(userID, function(result){
			if(result == null){ // new player
				var content = {
					"color": 12345678,
					"title": "Welcome to the Digimon World!",
					"fields": [
						{
							"name": "Choose your digimon",
							"value": "Please select a digimon from the following: " +
									"Palmon, Biyomon, Agumon, Patamon, Gabumon, Gomamon, Tentomon, Gatomon." + 
									" They are pictured in order below. To make your selection," +
									" type \"d!choose \" followed by the digimon's name, capitalizing the first letter." +
									" Example: d!choose Agumon"
						}
					],
					"image": {
						"url": "https://i.loli.net/2018/10/25/5bd0e3adec2a2.gif"
					}
				};
				callback(content)
			} else { //player exists
				var content = {
					"color": 12345678,
					"description": "You have already chosen a digimon! Type d!myinfo to view it!"
				};
				callback(content);
			}
		});
	},

	//myinfo
	myInfo: function(user, userID, callback){
		dbPlayer.showPlayer(userID, function(result){
			if(result != null){ // player exists
				var content = {
					"color": 12345678,
					"title": "Player " + user + " Info",
					"fields": [
						{
							"name": "Digimon Name",
							"value": result["digimonName"],
						},
						{
							"name": "Level",
							"value": result["level"],
						},
						{
							"name": "XP",
							"value": result["XP"] + "/" + result["maxXP"],
						},
						{
							"name": "HP",
							"value": result["HP"],
						},
						{
							"name": "Atk",
							"value": result["Atk"],
						},
						{
							"name": "Def",
							"value": result["Def"],
						},
						{
							"name": "Critical",
							"value": result["Critical"] + "%",
						},
						{
							"name": "Evade",
							"value": result["Evade"] + "%",
						}
					],
					"image": {
						"url": result["picURL"]
					}
				};
				callback(content);
			} else { // new player
				var content = {
					"color": 12345678,
					"description": "You haven't chosen any digimon yet! Type d!choose [digimon] to choose one!"
				};
				callback(content);
			}		
		});
	},

	//help
	help: function(callback){
		var content = {
			"color": 12345678,
			"fields": [{
				"name": "Help",
				"value": "Under Construction!"
			}]
		};
		callback(content);
	},

	//choose
	choose: function(userID, args, callback){
		dbDigimon.showDigimon(args, function(dResult){
			if(dResult != null){ // digimon exists
				dbPlayer.showPlayer(userID, function(pResult){
					if(pResult != null){ // player exists
						var content = {
							"color": 12345678,
							"description": "You have already chosen a digimon! Type d!myinfo to view!"
						};
						callback(content)
					} else { // new player
						dbPlayer.addPlayer(userID, dResult, function(res){
							if(res){
								var content = {
									"color": 12345678,
									"title": "addplayer",
									"description": "Choose Digimon Succeed!"
								};
								callback(content)
							} else {
								var content = {
									"color": 12345678,
									"title": "addplayer",
									"description": "Player Already Exist!"
								};
								callback(content)
							}
							
						})
					}
				})
			} else { // digimon not found
				if(args[0] != undefined){
					var content = {
						"color": 12345678,
						"description": "Digimon " + args[0] + " does not Exist!"
					};
					callback(content)
				} else {
					var content = {
						"color": 12345678,
						"description": "Please type a Digimon Name!"
					};
					callback(content)
				}
			}
		});
	},

	//deleteme
	deleteme: function(userID, callback){
		dbPlayer.deletePlayer(userID, function(res){
			if(res){
				var content = {
					"color": 12345678, 
					"title": "deleteplayer",
					"description": "Delete Player Succeed!"
				};
				callback(content)
			} else {
				var content = {
					"color": 12345678, 
					"title": "deleteplayer",
					"description": "Player does not Exist!"
				};
				callback(content)
			}
		});
	},
	//battle

	//top10


}//end

