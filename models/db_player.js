// database config
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, database) {

	if (err) throw err;

	// setup database
	var db = database.db("digimon");
	var col = db.collection("player");

	// temporary
	// add player into collection "player"
	exports.addPlayer = function (userID, args, callback) { 
		searchPlayer(userID, function(result) {
			if (result) { // found
				callback("Player Already Exist!");
			} else { // not found
				var player = { 	
					"_id": userID,
					"digimonName": args["name"],
					"level": 1,
					"XP": 0,
					"maxXP": 10,
					"HP": args["HP"],
					"Atk": args["Atk"],
					"Def": args["Def"],
					"picURL": args["picURL"]
				};
				col.insertOne(player, function(err, res) {
					if (err) throw err;
					callback("Add Player Succeed!");
				});
			}
		});
	};// end of addPlayer

	// show player in collection "player"
	exports.showPlayer = function (user, userID, callback) {
		searchPlayer(userID, function(result) {
			if (result) { // found
				col.find({"_id": userID}).toArray(function(err, res) {
					if (err) throw err;
					callback(res[0])
				})
			} else {
				console.log("Player " + user + " Does Not Exist!");
			}
		});
	};//end of showPlayer

	// list all player in collection "player"
	exports.listPlayer = function (callback) {
		col.find({}).toArray(function(err, result) {
			if (err) throw err;
			callback(JSON.stringify( result ))
		})
	};//end of listPlayer

	//delete player in collection "player"
	exports.deletePlayer = function (userID, callback) { 
		searchPlayer(userID, function(result) {
			if (result) { // found
				col.deleteOne({"_id": userID}, function(err, res) {
					if (err) throw err;
					callback("Delete Player Succeed!");
				});
			} else { // not found
				callback("Player does not Exist!");
			}
		});
	};//end of deletePlayer

	//searchPlayer
	var searchPlayer = function (userID, callback) {
		col.find({"_id":userID}).toArray(function(err, result) {
			if (err) throw err;
			if (result === undefined || result.length == 0) {
				callback(false);
			} else { // if player exist in database
				callback(true);
			}
		})
	};//end of searchPlayer

	//add more

});// end of db_player
