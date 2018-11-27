// requires
var randomGen = require('../models/random_gen.js')
	,dbBattlePlayer = require('../models/db_battle_player.js')
	,dbBattleRandom = require('../models/db_battle_random.js');

// admin cases
module.exports = {
	// settimer
	settimer: function(userID, args, callback){
		randomGen.setTime(userID, args, function(result){
			var content = {
				"color": 14285739, 
				"title": "Random Gen",
				"description": "A Random Digimon Appeared! Type d!br to battle it!",
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
		});
	},

	// delete Player Battle
	deleteplayerbattle: function(userID, callback){
		dbBattlePlayer.deletePlayerBattle(function(result){
			if (result) {
				var content = {
					"color": 14285739, 
					"title": "Delete Player Battle",
					"description": "Delete Player Battle Success!",
				};
				callback(content)
			} else {
				var content = {
					"color": 14285739, 
					"title": "Delete Player Battle",
					"description": "Delete Player Battle Failed!",
				};
				callback(content)
			}
		})
	},

	// delete Random Battle
	deleterandombattle: function(userID, callback){
		dbBattleRandom.deleteRandomBattle(function(result){
			if (result) {
				var content = {
					"color": 14285739, 
					"title": "Delete Random Battle",
					"description": "Delete Random Battle Success!",
				};
				callback(content)
			} else {
				var content = {
					"color": 14285739, 
					"title": "Delete Random Battle",
					"description": "Delete Random Battle Failed!",
				};
				callback(content)
			}
		})
	},

	// add admin
}// end