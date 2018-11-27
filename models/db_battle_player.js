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

	// newPlayerBattle
	var newPlayerBattle = function (pA, pB, callback) {
		var field = { 
			"_id": 0,
			"playerA": pA,
			"playerB": pB,
			"time": new Date()
		};
		// insert player A & B into field
		col.updateOne({"_id": 0}, {$set: field}, {upsert: true}, function(err, res) {
			if (err) throw err;
			callback(true);
		});
	};

	// startBattle
	exports.startBattle = function (userID, args, callback) { 
		dbPlayer.showPlayer(userID, function(resA){ // serach playerA
			if (resA != null) { // if playerA exists
				dbPlayer.showPlayer(args[0].substring(2).replace(">", ""), function(resB){ // search playerB
					if (resB != null) { // if playerB exists
						newPlayerBattle(resA, resB, function(result){ // create battle field
							if(result){ // if create field successed
								callback("s");
							}
						})
					} else {
						callback("b") // if playerB not found
					}
				});
			} else {
				callback("a") // if playerA not found
			}
		});
	};

	// acceptBattle
	exports.acceptBattle = function (userID, callback) {
		col.find({"_id": 0}).toArray(function(err, res) { // search battle field
			if (err) throw err;
			if (res[0]["playerB"]["_id"] === userID) { // found battle
				if (new Date() - res[0]["time"] < 100000) { // if accept in 100 sec
					callback("s"); // accepted
				} else {
					callback("t"); // timeout
				}
			} else {
				callback("n"); // no battle found
			}
		})
	};

	// deleteBattle -admin
	exports.deletePlayerBattle = function (callback) {
		col.find({"_id": 0}).toArray(function(err, res) { // search battle field
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
	};



});// end