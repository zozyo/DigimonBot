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

	var newPlayerBattle = function (callback) {
		var field = { 
			"_id": 0,
			"playerA": {},
			"playerB": {},
			"time": Date.UTC()
		};
		col.updateOne({"_id": 0}, {$set: field}, {upsert: true}, function(err, res) {
			if (err) throw err;
			callback(true);
		});
	}

	exports.startBattle = function (userID, args, callback) { 
		var playerA = dbPlayer.showPlayer(userID);
		var BID = args[0].substring(2).replace(>$, "");
		var playerB = dbPlayer.showPlayer(BID);

		console.log(playerA);
		console.log(playerB);

	}
});// end of db_digimon