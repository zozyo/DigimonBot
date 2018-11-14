// database config
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//requires
var dbp = require('./db_player.js');

MongoClient.connect(url, { useNewUrlParser: true }, function(err, database) {

	if (err) throw err;

	// setup database
	var db = database.db("digimon");
	var col = db.collection("battlePlayer");

	var newBattle = function (callback) {
		var field = { 
			"_id": 0,
			"playerA": {},
			"playerB": {},
			"time": Date()
		};
		col.insertOne(field, function(err, res) {
			if (err) throw err;
			callback(true);
		});
	}

	exports.addPlayer = function (userID, args, callback) { 
		
	}
});// end of db_digimon