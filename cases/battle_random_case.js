// requires
var dbBattleRandom = require('../models/db_battle_random.js');

// battle random cases
module.exports = {
	// br
	br: function(user, userID, callback) {
		dbBattleRandom.startBattle(userID, function(res){
			console.log("23")
			if (res === "s") { // success
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Accpet Battle",
						"value": "Random Digimon Battle Start! Type d!rattack to fight."
					}]
				};
				callback(content);
			} else if (res === "t") { // timeout
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Timeout!",
						"value": "Random Digimon Run Away!"
					}]
				};
				callback(content);
			} else if (res === "n") { // not found
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Oops",
						"value": "You have no digimon!"
					}]
				};
				callback(content);
			}
		});
	},

	// attack
	rattack: function(user, userID, callback) {
		dbBattleRandom.calculateBattle(userID, function(res, round){
			if (res === "n") { // if not in battle
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Oops! " + user,
						"value": "No battle for you!"
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
				if (round === "P"){
					if (res[2] != 1) { // if battle not end
						if (res[0] === 1) { // hit
							var content = {
								"color": 12345678,
								"title": user + " Round",
								"fields": [{
									"name": "Hit!",
									"value": "Hit! Random Digimon HP remaining: " + res[1]
								}]
							};
							callback(content);
						} else if (res[0] === 2) { // critical
							var content = {
								"color": 12345678,
								"title": user + " Round",
								"fields": [{
									"name": "Critical!",
									"value": "Critical Hit! Random Digimon HP remaining: " + res[1]
								}]
							};
							callback(content);
						} else if (res[0] === 0) { // evade
							var content = {
								"color": 12345678,
								"title": user + " Round",
								"fields": [{
									"name": "Dodge!",
									"value": "Random Digimon dodged your attack! Random Digimon HP remaining: " + res[1]
								}]
							};
							callback(content);
						}
					} else { // if battle end
						if (res[0] === 1) { // hit
							var content = {
								"color": 12345678,
								"title": user + " Round",
								"fields": [
									{
										"name": "Hit!",
										"value": "Hit! Random Digimon HP remaining: " + res[1]
									},
									{
										"name": "Congratulations!",
										"value": "You defeated Random Digimon!"
									}
								]
							};
							callback(content);
						} else if (res[0] === 2) { // critical
							var content = {
								"color": 12345678,
								"title": user + " VS Random Digimon",
								"fields": [
									{
										"name": "Critical!",
										"value": "Critical Hit! Random Digimon HP remaining: " + res[1]
									},
									{
										"name": "Congratulations!",
										"value": "You defeated Random Digimon!"
									}
								]
							};
							callback(content);
						}
					}	
				} else if (round === "R") {
					if (res[2] != 1) { // if battle not end
						if (res[0] === 1) { // hit
							var content = {
								"color": 12345678,
								"title": "Random Digimon Round",
								"fields": [{
									"name": "Hit!",
									"value": "Random Digimon Hit You! Your HP remaining: " + res[1]
								}]
							};
							callback(content);
						} else if (res[0] === 2) { // critical
							var content = {
								"color": 12345678,
								"title": "Random Digimon Round",
								"fields": [{
									"name": "Critical!",
									"value": "Random Digimon Critical Hit You! Your HP remaining: " + res[1]
								}]
							};
							callback(content);
						} else if (res[0] === 0) { // evade
							var content = {
								"color": 12345678,
								"title": "Random Digimon Round",
								"fields": [{
									"name": "Dodge!",
									"value": "You dodged Random Digimon attack! Your HP remaining: " + res[1]
								}]
							};
							callback(content);
						}
					} else { // if battle end
						if (res[0] === 1) { // hit
							var content = {
								"color": 12345678,
								"title": "Random Digimon Round",
								"fields": [
									{
										"name": "Hit!",
										"value": "Random Digimon Hit You! Your HP remaining: " + res[1]
									},
									{
										"name": "Sorry!",
										"value": "You are defeated by Random Digimon!"
									}
								]
							};
							callback(content);
						} else if (res[0] === 2) { // critical
							var content = {
								"color": 12345678,
								"title": "Random Digimon Round",
								"fields": [
									{
										"name": "Critical!",
										"value": "Random Digimon Critical Hit You! Your HP remaining: " + res[1]
									},
									{
										"name": "Sorry!",
										"value": "You are defeated by Random Digimon!"
									}
								]
							};
							callback(content);
						}
					}	
				}
			}
		})
	},

	// surrender
	rsurrender: function(user, userID, callback) {
		dbBattleRandom.surrender(userID, function(res){
			if (res === "n") { // if not in battle
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Oops! " + user,
						"value": "No battle for you!"
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
			} else if (res === "s") { // surrendered
				var content = {
					"color": 12345678,
					"title": user + " Surrendered!",
					"fields": [{
						"name": "Surrendered!",
						"value": "Your Surrendered! Random Digimon Win!"
					}]
				};
				callback(content);
			}
		})
	},

}//end