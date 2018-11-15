//requires
var dbBattlePlayer = require('../models/db_battle_player.js');

//battle cases
module.exports = {
	//bp
	bp: function(user, userID, args, callback) {
		dbBattlePlayer.startBattle(userID, args, function(res){
			if (res === "s") {
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Battle with",
						"value": "<@" + args[0].substring(2).replace(">", "") + ">"
					}]
				};
				callback(content);
			} else if (res === "a") {
				var content = {
					"color": 12345678,
					"fields": [{
						"name": "Wrong",
						"value": "You have no digimon!"
					}]
				};
				callback(content);
			} else if (res === "b") {
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
	}


}//end