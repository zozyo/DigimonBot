var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function database() {  

	this.addPlayer = function(userID) { 
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("digimon");
			var myobj = { 	
				"_id": userID,
				"playerDigimon": "Agumon",
			};
			dbo.collection("player").insertOne(myobj, function(err, res) {
				if (err) throw err;
					console.log("Add Player Succeed!");
				db.close();
			});
		});
	};

	this.listPlayer = function() { 
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("digimon");
			dbo.collection("player"). find({}).toArray(function(err, result) { // 返回集合中所有数据
				if (err) throw err;
				return result;
				db.close();
			});
		});
	}; 
};//end of db

module.exports = database;