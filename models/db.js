// database config
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, database) {

	if (err) throw err;

	// setup database
	var db = database.db("digimon");
	var colP = db.collection("player");

	// temporary
	// add player into collection "player"
	exports.addPlayer = function (userID, callback) { 
		colP.find({"_id":userID}).toArray(function(err, result) {
			if (err) throw err;
			if (result === undefined || result.length == 0) { // if new player
				var player = { 	
					"_id": userID,
					"playerDigimon": "Agumon",
				};
				colP.insert(player, function(err, res) {
					if (err) throw err;
					callback("Add Player Succeed!");
				});
				
			} else { // if player exist in database
				callback("Player Already Exist!");
			}
		});
	};// end of addPlayer

	// list all player in collection "player"
	exports.listPlayer = function (callback) {
		colP.find({}).toArray(function(err, result) {
			if (err) throw err;
			callback(JSON.stringify( result ))
		})
	};//end of listPlayer

	//delete player in collection "player"
	exports.deletePlayer = function (userID, callback) { 
		var userID = {"_id":userID};
		colP.find(userID).toArray(function(err, result) {
			if (err) throw err;
			if (result === undefined || result.length == 0) { // if no player found
				callback("Player does not Exist!")
			} else { // if player exist in database
				colP.deleteOne(userID, function(err, res) {
					if (err) throw err;
					callback("Delete Player Succeed!");
				})
			}
		})
	};//end of deleteplayer

	//add more

});// end of db