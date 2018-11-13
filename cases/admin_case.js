//requires
var dbp = require('../models/db_player.js')
	, dbd = require('../models/db_digimon.js')
	, dbrandom = require('../models/db_random_digimon.js')
	, randomGen = require('../models/random_gen.js');

//admin cases
module.exports = {
	//settimer
	settimer: function(user, userID, channelID, args, callback){
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

	//add admin
}//end