// database config
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//requires
var dbPlayer = require('./db_player.js');

MongoClient.connect(url, { useNewUrlParser: true }, function(err, database) {

	if (err) throw err;

	// setup database
	var db = database.db("digimon");
	var col = db.collection("battleField");

	var newPlayerBattle = function (pA, pB, callback) {
		var field = { 
			"_id": 0,
			"playerA": pA,
			"playerB": pB,
			"time": Date()
		};
		col.updateOne({"_id": 0}, {$set: field}, {upsert: true}, function(err, res) {
			if (err) throw err;
			callback(true);
		});
	}

	exports.startBattle = function (userID, args, callback) { 
		dbPlayer.showPlayer(userID, function(resA){
			if (resA != null) { // if playerA exists
				dbPlayer.showPlayer(args[0].substring(2).replace(">", ""), function(resB){
					if (resB != null) { // if playerB exists
						newPlayerBattle(resA, resB, function(result){
							if(result){ // if create field successed
								col.find({"_id": 0}).toArray(function(err, res) {
									if (err) throw err;
									console.log(res[0]);
									callback("s");
								})
							}
						})
					} else {
						callback("b")
					}
				});
			} else {
				callback("a")
			}
		});
		

		

	}
});// end of db_digimon