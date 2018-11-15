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
			"time": Date.UTC()
		};
		col.updateOne({"_id": 0}, {$set: field}, {upsert: true}, function(err, res) {
			if (err) throw err;
			callback(true);
		});
	}

	exports.startBattle = function (userID, args, callback) { 
		var playerA, playerB;

		dbPlayer.showPlayer(userID, function(res){
			playerA = res;
		});

		var BID = args[0].substring(2).replace(">", "");
		dbPlayer.showPlayer(BID, function(res){
			playerB = res;
		});

		newPlayerBattle(playerA, playerB, function(result){
			if(result){
				col.find({"_id": 0}).toArray(function(err, res) {
					if (err) throw err;
					console.log(res[0]);
				})
			}
		})

	}
});// end of db_digimon