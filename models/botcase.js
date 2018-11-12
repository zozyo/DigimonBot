//requires
var dbp = require('./db_player.js')
	, dbd = require('./db_digimon.js')
	, dbrandom = require('./db_random_digimon.js')
	, randomGen = require('./random_gen.js');

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

	//start
	start: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"title": "Welcome to the Digimon World!",
			"fields": [
				{
					"name": "Choose your digimon",
					"value": "Please select a digimon from the following: Palmon, Biyomon, Agumon, Patamon, Gabumon, Gomamon, Tentomon, Gatomon. They are pictured in order below. To make your selection, type \"d!choose \" followed by the digimon's name, capitalizing the first letter. Example: d!choose Agumon"
				}
			],
			"image": {
				"url": "https://i.loli.net/2018/10/25/5bd0e3adec2a2.gif"
			}
		};
		callback(content)
	},

	// show user info
	myinfo: function(user, userID, channelID, args, callback){
		dbp.showPlayer(user, userID, function(result){
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
		dbd.showDigimon(userID, args, function(dResult){
			if(dResult != null){ // digimon exists
				dbp.showPlayer(user, userID, function(pResult){
					if(pResult != null){ // player exists
						var content = {
							"color": 12345678,
							"description": "You have already chosen a digimon! Type d!myinfo to view!"
						};
						callback(content)
					} else { // new player
						dbp.addPlayer(userID, dResult, function(mResult){
							var content = {
								"color": 12345678,
								"title": "addplayer",
								"description": mResult
							};
							callback(content)
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

	//adddigimon name next HP Atk Def picURL
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

	//showdigimon name
	showdigimon: function(userID, userID,channelID, args, callback){
		dbd.showDigimon(userID, args, function(result){
			if(result != null){
				var content = {
					"color": 12345678,
					"title": "searchdigimon",
					"fields": [
						{
							"name": "Digimon Name",
							"value": result["name"],
						},
						{
							"name": "Next Digivolution",
							"value": result["next"],
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
				callback(content)
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
	},


	//random digimon database
	//add random digimon
	//insert name stage HP Atk Def Critical Evade picURL
	insert: function(userID, userID,channelID, args, callback){
		dbrandom.addDigimon(userID, args, function(result){
			var content = {
				"color": 12345678,
				"title": "add random digimon",
				"description": result
			};
			callback(content)
		})
	},

	show: function(userID, userID,channelID, args, callback){
		dbrandom.showDigimon(userID, args, function(result){
			if(result != null){
				var content = {
					"color": 12345678,
					"title": "search random digimon",
					"fields": [
						{
							"name": "Digimon Name",
							"value": result["name"],
						},
						{
							"name": "Stage",
							"value": result["stage"],
						},
						{
							"name": "Level",
							"value": result["level"],
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
				callback(content)
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
		})
	},

	delete: function(user, userID, channelID, args, callback){
		dbrandom.deleteDigimon(userID, args, function(result){
			var content = {
				"color": 12345678, 
				"title": "delete random digimon",
				"description": result
			};
			callback(content)
		});
	},

	list: function(user, userID, channelID, args, callback){
		dbrandom.listDigimon(userID, args, function(result){
			var content = {
				"color": 14285739, 
				"title": "list random digimon page " + args[0],
				"description": result
			};
			callback(content)
		});
	},

	//rendom gen set
	settimer: function(user, userID, channelID, args, callback){
		randomGen.setTime(userID, args, function(result){
			var content = {
				"color": 14285739, 
				"title": "list random digimon page " + args[0],
				"description": result
			};
			callback(content)
		});
	},
	//add more
}// end of cases