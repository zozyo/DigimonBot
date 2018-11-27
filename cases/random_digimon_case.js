// requires
var dbRandom = require('../models/db_random_digimon.js');

// random digimon cases
module.exports = {
	// radd name stage HP Atk Def Critical Evade picURL
	radd: function(userID, args, callback) {
		dbRandom.addDigimon(args, function(res) {
			if(res) {
				var content = {
					"color": 12345678,
					"title": "add random digimon",
					"description": "Add Digimon " + args[0] + " Succeed!"
				};
				callback(content)
			} else {
				var content = {
					"color": 12345678,
					"title": "add random digimon",
					"description": "Digimon " + args[0] + " Already Exist!"
				};
				callback(content)
			}
		})
	},

	// rshow
	rshow: function(userID, args, callback) {
		dbRandom.showDigimon(args, function(result) {
			if(result != null) {
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
				if(args[0] != undefined) {
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

	// rdel
	rdel: function(userID, args, callback) {
		dbRandom.deleteDigimon(args, function(res) {
			if (res) {
				var content = {
					"color": 12345678, 
					"title": "delete random digimon",
					"description": "Delete Digimon " + args[0] + " Succeed!"
				};
				callback(content)
			} else {
				var content = {
					"color": 12345678, 
					"title": "delete random digimon",
					"description": "Digimon " + args[0] + " does not Exist!"
				};
				callback(content)
			}	
		});
	},

}