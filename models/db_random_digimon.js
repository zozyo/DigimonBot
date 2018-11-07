// database config
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, database) {

	if (err) throw err;

	// setup database
	var db = database.db("digimon");
	var col = db.collection("randomDigimon");

	// temporary
	// add digimon into collection "digimon"
	exports.addDigimon = function (userID, args, callback) { 
		searchDigimon(userID, args[0], function(result) {
			if (result) { // found
				callback("Digimon " + args[0] + " Already Exist!");
			} else { // not found
				var digimon = { 	
					"name": 	args[0],
					"stage": 	args[1],
					"HP": 		args[2],
					"Atk": 		args[3],
					"Def": 		args[4],
					"picURL": 	args[5],
				};
				col.insertOne(digimon, function(err, res) {
					if (err) throw err;
					callback("Add Digimon " + args[0] + " Succeed!");
				});
			}
		});
	};// end of addDigimon

	// show digimon in collection "digimon"
	exports.showDigimon = function (userID, args, callback) {
		searchDigimon(userID, args[0], function(result) {
			if (result) { // found
				col.find({"name": args[0]}).toArray(function(err, res) {
					if (err) throw err;
					callback(res[0])
				})
			} else { //not found
				callback(null);
			}
		});
	};//end of showdigimon

	// list all digimon in collection "digimon"
	exports.listDigimon = function (callback) {
		col.find({},  { projection: { _id: 0, name: 1 } } ).toArray(function(err, result) {
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