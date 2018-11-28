// requires
var dbBattlePlayer = require('../models/db_battle_player.js');

// battle player cases
module.exports = {
	// bp
	bp: function(user, userID, args, callback) {
		dbBattlePlayer.startBattle(userID, args, function(res){
			if (res === "s") { // if field create success
				var content = {
					"color": 12345678,
					"title": "Please accept battle in 100 seconds!",
					"fields": [{
						"name": "Player " + user + " wants to battle with you! Type d!accept to Accpet Battle!",
						"value": "<@" + args[0].substring(2).replace(">", "") + ">"
					}]
				};
				callback(content);
			} else if (res === "a") { // if playerA not found
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Wrong",
						"value": "You have no digimon!"
					}]
				};
				callback(content);
			} else if (res === "b") { // if playerB not found
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Wrong",
						"value": "Player not Exist!"
					}]
				};
				callback(content);
			} else if (res === "o") { // if self
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Self Battle!",
						"value": "You cannot fight with yourself!"
					}]
				};
				callback(content);
			}
		});
	},

	// accept
	accept: function(user, userID, callback) {
		dbBattlePlayer.acceptBattle(userID, function(res){
			if (res === "s") { // success
				var content = {
					"color": 12345678,
					"fields": [
						{
							"name": "Accpet Battle",
							"value": "Digimon Battle Start!"
						},
						{
							"name": "Who calls the battle starts first!",
							"value": "Type d!attack to fight!"
						}
					]
				};
				callback(content);
			} else if (res === "t") { // timeout
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Timeout!",
						"value": "Accept Battle Timeout!"
					}]
				};
				callback(content);
			} else if (res === "n") { // not found
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Oops",
						"value": "No battle for you!"
					}]
				};
				callback(content);
			}
		});
	},

	attack: function(user, userID, callback) {
		dbBattlePlayer.calculateBattle(userID, function(res){
			console.log(res);
			if (res === "n") { // if not in battle
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Oops! " + user,
						"value": "No battle for you!"
					}]
				};
				callback(content);
			} else if (res === "w") { // if not the round
				var content = {
					"color": 12345678,
					"fields": [{
						"name": user + " Please Wait!",
						"value": "Wait your opponent!"
					}]
				};
				callback(content);
			} else if (res === "e") { //if battle end
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Battle Ended!",
						"value": "Battle had ended!"
					}]
				};
				callback(content);
			} else { // success attack
				if (res[2] != 1) { // if battle nnot end
					if (res[0] === 1) { // hit
						var content = {
							"color": 12345678,
							"title": user + " Round",
							"fields": [{
								"name": "Hit!",
								"value": "Hit! Your opponent HP remaining: " + res[1]
							}]
						};
						callback(content);
					} else if (res[0] === 2) { // critical
						var content = {
							"color": 12345678,
							"title": user + " Round",
							"fields": [{
								"name": "Critical!",
								"value": "Critical Hit! Your opponent HP remaining: " + res[1]
							}]
						};
						callback(content);
					} else if (res[0] === 0) { // evade
						var content = {
							"color": 12345678,
							"title": user + " Round",
							"fields": [{
								"name": "Dodge!",
								"value": "Your opponent dodged your attack! HP remaining: " + res[1]
							}]
						};
						callback(content);
					}
				} else { // if battle end
					if (res[0] === 1) { // hit
						var content = {
							"color": 12345678,
							"title": user + " Win!",
							"fields": [
								{
									"name": "Hit!",
									"value": "Hit! Your opponent HP remaining: " + res[1]
								},
								{
									"name": "Congratulations!",
									"value": "You defeated your opponent!"
								}
							]
						};
						callback(content);
					} else if (res[0] === 2) { // critical
						var content = {
							"color": 12345678,
							"title": user + " Win!",
							"fields": [
								{
									"name": "Critical!",
									"value": "Critical Hit! Your opponent HP remaining: " + res[1]
								},
								{
									"name": "Congratulations!",
									"value": "You defeated your opponent!"
								}
							]
						};
						callback(content);
					} else if (res[0] === 0) { // evade
						var content = {
							"color": 12345678,
							"title": user + " Win!",
							"fields": [
								{
									"name": "Dodge!",
									"value": "Your opponent dodged your attack! HP remaining: " + res[1]
								},
								{
									"name": "Congratulations!",
									"value": "You defeated your opponent!"
								}
							]
						};
						callback(content);
					}
				}	
			}
		})
	},

}//end