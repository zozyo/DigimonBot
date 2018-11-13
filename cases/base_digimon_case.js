//requires
var dbDigimon = require('../models/db_digimon.js');

//base digimon cases
module.exports = {
	//adddigimon name next HP Atk Def picURL
	dadd: function(userID, args, callback){
		dbDigimon.addDigimon(args, function(res){
			if(res){
				var content = {
					"color": 12345678,
					"title": "adddigimon",
					"description": "Add Digimon " + args[0] + " Succeed!"
				};
				callback(content)
			} else {
				var content = {
					"color": 12345678,
					"title": "adddigimon",
					"description": "Digimon " + args[0] + " Already Exist!"
				};
				callback(content)
			}
		})
	},

	//showdigimon name
	dshow: function(userID, args, callback){
		dbDigimon.showDigimon(args, function(result){
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

	//deletedigimon name
	ddel: function(userID, args, callback){
		dbDigimon.deleteDigimon(args, function(res){
			if(res){
				var content = {
					"color": 12345678, 
					"title": "deletedigimon",
					"description": "Delete Digimon " + args[0] + " Succeed!"
				};
				callback(content)
			} else {
				var content = {
					"color": 12345678, 
					"title": "deletedigimon",
					"description": "Digimon " + args[0] + " does not Exist!"
				};
				callback(content)
			}
		});
	},
}