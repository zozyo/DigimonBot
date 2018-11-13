// database config
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//requires
var dbp = require('./db_player.js')

MongoClient.connect(url, { useNewUrlParser: true }, function(err, database) {

	if (err) throw err;

	// setup database
	var db = database.db("digimon");
	var col = db.collection("battlePlayer");

	exports.addPlayer = function (userID, args, callback) { 
		//to do
	}
});// end of db_digimon