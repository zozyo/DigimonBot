var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, database) {

	if (err) throw err;
	var db = database.db("digimon");
	var collectionP = db.collection("player");

	exports.addPlayer = function (userID) { 
		var player = { 	
			"_id": userID,
			"playerDigimon": "Agumon",
		};
		collectionP.insert(player, function(err, res) {
			if (err) throw err;
			console.log("Add Player Succeed!");
		});
	};

	exports.listPlayer = function () { 
		return collectionP.find({});
	}; 
});//end of db