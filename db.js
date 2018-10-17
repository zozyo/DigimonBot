var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/digimon";

function database() {  

	exports.addPlayer = function (userID) { 
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var collection = db.collection("player");
			var player = { 	
				"_id": userID,
				"playerDigimon": "Agumon",
			};
			collection.insert(player, function(err, res) {
				if (err) throw err;
				console.log("Add Player Succeed!");
				db.close();
			});
		});
	};

	exports.listPlayer = function () { 
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var collection = db.collection("player");
			collection. find({}).toArray(function(err, result) { // return all
				if (err) throw err;
				return result;
				db.close();
			});
		});
	}; 
};//end of db