// requires
var dbBattleRandom = require('../models/db_battle_random.js');

// battle random cases
module.exports = {
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