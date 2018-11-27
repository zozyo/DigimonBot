// database config
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, database) {

	if (err) throw err;

	// setup database
	var db = database.db("digimon");
	var col = db.collection("digimon");

	// add digimon into collection "digimon"
	exports.addDigimon = function (args, callback) { 
		searchDigimon(args[0], function(result) {
			if (result) { // found
				callback(false);
			} else { // not found
				var digimon = { 	
					"name": 	args[0],
					"next": 	args[1],
					"HP": 		args[2],
					"Atk": 		args[3],
					"Def": 		args[4],
					"Critical": args[5],
					"Evade":    args[6],
					"picURL": 	args[7]
				};
				col.insertOne(digimon, function(err, res) {
					if (err) throw err;
					callback(true);
				});
			}
		});
	};// end of addDigimon

	// show digimon in collection "digimon"
	exports.showDigimon = function (args, callback) {
		searchDigimon(args[0], function(result) {
			if (result) { // found
				col.find({"name": args[0]}).toArray(function(err, res) {
					if (err) throw err;
					callback(res[0])
				})
			} else { //not found
				callback(null);
			}
		});
	};// end of showdigimon

	// list all digimon in collection "digimon"
	exports.listDigimon = function (callback) {
		col.find({}, { projection: { _id: 0, picURL: 0 } }).toArray(function(err, result) {
			if (err) throw err;
			callback(JSON.stringify( result ))
		})
	};// end of listPlayer

	//delete digimon in collection "digimon"
	exports.deleteDigimon = function (args, callback) { 
		searchDigimon(args[0], function(result) {
			if (result) { // found
				col.deleteOne({"name": args[0]}, function(err, res) {
					if (err) throw err;
					callback(true);
				});
			} else { // not found
				callback(false);
			}
		});
	};// end of deleteDigimon

	// searchDigimon
	var searchDigimon = function (digimonName, callback) {
		col.find({"name": digimonName}).toArray(function(err, result) {
			if (err) throw err;
			if (result === undefined || result.length == 0) {
				callback(false);
			} else { // if digimon exist in database
				callback(true);
			}
		})
	};// end of searchDigimon

});// end of db_digimon