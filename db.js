var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/digimon";

MongoClient.connect(url, function(err, db) {

	if (err) throw err;
	var collectionP = db.collection("player");

	exports.addPlayer = function (userID) { 
		var player = { 	
			"_id": userID,
			"playerDigimon": "Agumon",
		};
		collectionP.insert(player, function(err, res) {
			if (err) throw err;
			console.log("Add Player Succeed!");
			db.close();
		});
	};

	exports.listPlayer = function () { 
		collectionP. find({}).toArray(function(err, result) { // return all
			if (err) throw err;
			return result;
			db.close();
		});
	}; 
};//end of db