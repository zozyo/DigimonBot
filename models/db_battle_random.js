// database config
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// requires
var dbPlayer = require('./db_player.js');

MongoClient.connect(url, { useNewUrlParser: true }, function(err, database) {

	if (err) throw err;

	// setup database
	var db = database.db("digimon");
	var col = db.collection("battleField");

	// newRandomBattle
	exports.newRandom = function (res) {
		var field = { 
			"_id": 1,
			"randomDigimon": res,
			"player": {},
			"time": new Date()
		};
		// insert random into field
		col.updateOne({"_id": 1}, {$set: field}, {upsert: true}, function(err, res) {
			if (err) throw err;
		});
	};

	// startBattle
	exports.startBattle = function (userID, args, callback) { 
		col.find({"_id": 1}).toArray(function(err, res) { // search battle field
			if (err) throw err;
			if (new Date() - res[0]["time"] < 100000) { // if accept in 100 sec
				dbPlayer.showPlayer(userID, function(player){ // search player
					if (player != null) { // if player exists
						// insert player into field
						col.updateOne({"_id": 1}, {$set: {"player": player}}, function(err, res) {
							if (err) throw err;
							callback("s"); // accepted
						}); 
					} else {
						callback("n"); // if player not found
					}
				});
			} else {
				callback("t"); // timeout
			}
		})
	};

	// deleteBattle -admin
	exports.deleteRandomBattle = function (callback) {
		col.find({"_id": 1}).toArray(function(err, res) { // search battle field
			if (err) throw err;
			if (res === undefined || res.length == 0) {
				callback(false)
			} else {
				col.deleteOne({"_id": 0}, function(err, res) {
					if (err) throw err;
					callback(true);
				});
			}
		}
	}

});// end