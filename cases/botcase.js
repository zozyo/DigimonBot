//requires
var player = require('./player_case.js');

// Our bot needs to know if it will execute a command
// It will listen for messages that will start with `d!`
module.exports = {

//player cases
	// ping
	ping: function(user, userID, channelID, args, callback){
		player[ping](callback);
	},

	//start
	start: function(user, userID, channelID, args, callback){
		player[start](userID, callback);
	},

	// show user info
	myinfo: function(user, userID, channelID, args, callback){
		player[myInfo](userID, callback);
	},

	// help menu
	help: function(user, userID, channelID, args, callback){
		player[help](callback);
	},

	// choose digimonName
	choose: function(user, userID, channelID, args, callback){	
		player[choose](userID, args, callback);
	},

	// deleteme
	deleteme: function(user, userID, channelID, args, callback){
		player[deleteme](callback);
	},

//test cases
	// listplayer
	plist: function(user, userID, channelID, args, callback){
		test[plist](callback);
	},

	// listdigimon
	dlist: function(user, userID, channelID, args, callback){
		test[dlist](callback);
	},

	// listrandomdigimon
	rlist: function(user, userID, channelID, args, callback){
		test[rlist](callback);
	},

//digimon database cases
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

//admin cases
	//rendom gen set
	settimer: function(user, userID, channelID, args, callback){
		admin[settimer](userID, args, callback);
	},

	//add more
}// end of cases