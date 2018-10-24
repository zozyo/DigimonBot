// database config
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, database) {

	if (err) throw err;

	// setup database
	var db = database.db("digimon");
	var col = db.collection("digimon");

	// temporary
	// add digimon into collection "digimon"
	exports.addDigimon = function (userID, args, callback) { 
		searchDigimon(userID, args[0], function(result) {
			if (result) { // found
				callback("Digimon " + args[0] + " Already Exist!");
			} else { // not found
				var digimon = { 	
					"name": 	args[0],
					"HP": 		parseInt(args[1]),
					"Atk": 		parseInt(args[2]),
					"Def": 		parseInt(args[3]),
					"picURL": 	args[4],
				};
				col.insertOne(digimon, function(err, res) {
					if (err) throw err;
					callback("Add Digimon " + args[0] + " Succeed!");
				});
			}
		});
	};// end of addDigimon

	exports.setDigimonDV = function (userID, args, callback) {
		searchDigimon(userID, args[0], function(result) {
			if (result) { // found
				var digimonDV = {
					"nextDV": {
						"DV1": 	args[1],
						"DV2": 	args[2],
						"DV3": 	args[3],
						"DV4": 	args[4],
					}
				};
				col.update({"name": args[0]}, digimonDV, {upsert: true}, function(err, res) {
					if (err) throw err;
					callback("Set Digimon " + args[0] + " Digivolution Succeed!");
				});
			} else { // not found
				callback("Digimon " + args[0] + " Does Not Exist!");
			}
		});
	};

	// show digimon in collection "digimon"
	exports.showDigimon = function (args, callback) {
		searchDigimon(userID, args[0], function(result) {
			if (result) { // found
				col.find({"name": args[0]}).toArray(function(err, res) {
					if (err) throw err;
					callback(res)
				})
			} else {
				callback("Digimon " + args[0] + " Does Not Exist!");
			}
		});
	};//end of showdigimon

	// list all digimon in collection "digimon"
	exports.listDigimon = function (callback) {
		col.find({}).toArray(function(err, result) {
			if (err) throw err;
			callback(JSON.stringify( result ))
		})
	};//end of listPlayer

	//delete digimon in collection "digimon"
	exports.deleteDigimon = function (userID, args, callback) { 
		searchDigimon(userID, args[0], function(result) {
			if (result) { // found
				col.deleteOne({"name": args[0]}, function(err, res) {
					if (err) throw err;
					callback("Delete Digimon " + args[0] + " Succeed!");
				});
			} else { // not found
				callback("Digimon " + args[0] + " does not Exist!");
			}
		});
	};//end of deleteDigimon

	//searchDigimon
	var searchDigimon = function (userID, digimonName, callback) {
		col.find({"name": digimonName}).toArray(function(err, result) {
			if (err) throw err;
			if (result === undefined || result.length == 0) {
				callback(false);
			} else { // if digimon exist in database
				callback(true);
			}
		})
	};//end of searchDigimon

	//add more

});// end of db_digimon