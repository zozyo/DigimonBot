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
			"round": "A",
			"available": true,
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
		dbPlayer.showPlayer(userID, function(pA){ // serach playerA
			if (pA != null) { // if playerA exists
				dbPlayer.showPlayer(args[0].substring(2).replace(">", ""), function(pB){ // search playerB
					if (pB != null) { // if playerB exists
						if (pA["_id"] != pB["_id"]) { // if not self
							newPlayerBattle(pA, pB, function(result){ // create battle field
								if(result){ // if create field successed
									callback("s");
								}
							})
						} else {
							callback("o")
						}
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
		searchBattle(function(res) { // search battle field
			if (res["playerB"]["_id"] === userID) { // found battle
				if (new Date() - res["time"] < 100000) { // if accept in 100 sec
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
		searchBattle(function(res) { // search battle field
			if (res != null) {
				callback(false);
			} else {
				col.deleteOne({"_id": 0}, function(err, res) {
					if (err) throw err;
					callback(true);
				});
			}
		})
	};
	

	// temporary
	// calculate Battle   
	exports.calculateBattle = function (userID, callback) {
		searchBattle(function(Field) { // search battle field
			if (Field["available" === true]) {
				round(Field["playerA"], Field["playerB"], Field["round"], function(res) {
					if (res instanceof Array) {
						battleEnd(res, function(ifEnd) {
							if (ifEnd) {
								updateBattle({"available": false}, function(result){
									if (result) {
										callback([res[0], res[1], 1])
									}
								})
							} else {
								callback([res[0], res[1], 0])
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

	var round = function (A, B, r, callback) {
		if (A["_id"] === userID) {
			if (r === "A") {
				fight(A, B, function(HPRemain){
					var setting = {"playerB": {"HP": HPRemain[1]}, "round": "B"};
					updateBattle(setting, function(res){
						if (res) {
							callback(HPRemain)
						}
					})
				})
			} else {
				callback("w")
			}
		} else if (B["_id"] === userID) { 
			if (r === "B") {
				fight(B, A, function(HPRemain){
					var setting = {"playerA": {"HP": HPRemain[1]}, "round": "A"};
					updateBattle(setting, function(res){
						if (res) {
							callback(HPRemain)
						}
					})
				})
			} else {
				callback("w")
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
		} else { // not hit
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
		col.find({"_id": 0}).toArray(function(err, res) { // search battle field
			if (err) throw err;
			callback(res[0]);
		})
	};

	// updateBattle
	var updateBattle = function (setting, callback) {
		col.updateOne({"_id": 0}, {$set: setting}, function(err, res) {
			if (err) throw err;
			callback(true)
		})
	}

});// end