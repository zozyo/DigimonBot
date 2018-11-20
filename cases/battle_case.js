//requires
var dbBattlePlayer = require('../models/db_battle_player.js');

//battle cases
module.exports = {
	//bp
	bp: function(user, userID, args, callback) {
		dbBattlePlayer.startBattle(userID, args, function(res){
			if (res === "s") { // if field create success
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Battle with",
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
			}
		});
	},

	//accept
	accept: function(user, userID, callback) {
		dbBattlePlayer.acceptBattle(userID, function(res){
			if (res === "s") {
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Accpet Battle",
						"value": "Digimon Battle Start!"
					}]
				};
				callback(content);
			} else if (res === "t") {
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Timeout!",
						"value": "Accept Battle Timeout!"
					}]
				};
				callback(content);
			} else if (res === "n") {
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



}//end