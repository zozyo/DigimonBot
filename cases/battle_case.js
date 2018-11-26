// requires
var dbBattlePlayer = require('../models/db_battle_player.js')
	,dbBattleRandom = require('../models/db_battle_random.js');;

// battle cases
module.exports = {
// with player
	// bp
	bp: function(user, userID, args, callback) {
		dbBattlePlayer.startBattle(userID, args, function(res){
			if (res === "s") { // if field create success
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Player " + user + " wants to battle with you! " + "<@" + args[0].substring(2).replace(">", "") + ">",
						"value": "Please accept battle in 100 seconds!"
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
			}
		});
	},

	// accept
	accept: function(user, userID, callback) {
		dbBattlePlayer.acceptBattle(userID, function(res){
			if (res === "s") { // success
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Accpet Battle",
						"value": "Digimon Battle Start!"
					}]
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


// with random digimon
	// br
	br: function(user, userID, callback) {
		dbBattleRandom.startBattle(userID, function(res){
			if (res === "s") { // success
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Accpet Battle",
						"value": "Random Digimon Battle Start!"
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
}//end