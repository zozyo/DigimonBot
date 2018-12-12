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
			"player": "p",
			"available": true,
			"time": new Date()
		};
		// insert random into field
		col.updateOne({"_id": 1}, {$set: field}, {upsert: true}, function(err, res) {
			if (err) throw err;
		});
	};

	// startBattle
	exports.startBattle = function (userID, callback) { 
		col.find({"_id": 1}).toArray(function(err, res) { // search battle field
			if (err) throw err;
			if (new Date() - res[0]["time"] < 100000) { // if accept in 100 sec
				dbPlayer.showPlayer(userID, function(player){ // search player
					if (player != null) { // if player exists
						// insert player into field
						updateBattle({"player": player}, function(res) {
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
		});
	};

	// temporary
	// calculate Battle   
	exports.calculateBattle = function (userID, callback) {
		searchBattle(function(Field) { // search battle field
			if (Field["available"] === true) { // if battle not end
				round(userID, Field["player"], Field["randomDigimon"], function(res, round) { // start round
					if (res instanceof Array) { 
						battleEnd(res, function(ifEnd) { // check if battle end
							if (ifEnd) {
								updateBattle({"available": false}, function(result){ // end the battle
									if (result) {
										callback([res[0], 0, 1], round) // crit or evade, hp, end?
										// give xp to winner
									}
								})
							} else {
								callback([res[0], res[1], 0], round) // crit or evade, hp, end?
							}
						})
					} else {
						callback(res)
					}
				})
			} else {
				callback("e")
			}
		})
	};

	var round = function (userID, P, R, callback) {
		if (P["_id"] === userID) {
			fight(P, R, function(HPRemain){
				var setting = {"randomDigimon.HP": HPRemain[1]};
				updateBattle(setting, function(res){
					if (res) {
						callback(HPRemain, "P")
					}
				})
			});
			searchBattle(function(Field) {
				if (Field["randomDigimon.HP"] > 0) {
					fight(R, P, function(HPRemain){
						var setting = {"player.HP": HPRemain[1]};
						updateBattle(setting, function(res){
							if (res) {
								callback(HPRemain, "R")
							}
						})
					})
				}
			}
		} else {
			callback("n")
		}
	};

	var fight = function (X, Y, callback) {
		var HPRemain = parseInt(Y["HP"]);
		if ( Math.random() * 100 > parseFloat(Y["Evade"]) ) { // if hit
			if ( Math.random() * 100 < parseFloat(X["Critical"]) ) { // if critical
				HPRemain = HPRemain + parseInt(Y["Def"]) - parseInt(X["Atk"]) * 2; // HP Remain
				callback([2, HPRemain]);
			} else { // if not critical
				HPRemain = HPRemain + parseInt(Y["Def"]) - parseInt(X["Atk"]); // HP Remain
				callback([1, HPRemain]);
			}
		} else { // evade
			callback([0, HPRemain]);
		}
	};

	var battleEnd = function (HP, callback) {
		if (HP[1] <= 0) {
			callback(true)
		} else {
			callback(false)
		}
	};

	// searchBattle
	var searchBattle = function (callback){
		col.find({"_id": 1}).toArray(function(err, res) { // search battle field
			if (err) throw err;
			callback(res[0]);
		})
	};

	// updateBattle
	var updateBattle = function (setting, callback) {
		col.updateOne({"_id": 1}, {$set: setting}, function(err, res) {
			if (err) throw err;
			callback(true)
		})
	};

	// surrender
	exports.surrender = function (userID, callback) {
		searchBattle(function(Field) { // search battle field
			if (Field["available"] === true) { 
				if (Field["player"] === userID) {
					updateBattle({"available": false}, function(result){
						if (result) {
							callback("s")
						}
					})
				} else {
					callback("n")
				}
			} else {
				callback("e")
			}
		})
	};

});// end