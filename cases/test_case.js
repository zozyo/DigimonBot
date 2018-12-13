// requires
var dbPlayer = require('../models/db_player.js')
	, dbDigimon = require('../models/db_digimon.js')
	, dbRandom = require('../models/db_random_digimon.js');

// test cases
module.exports = {
	// listplayer
	plist: function(userID, args, callback){
		dbPlayer.listPlayer(args, function(result){
			var content = {
				"color": 14285739, 
				"title": "listplayer" + args[0],
				"description": result
			};
			callback(content)
		});
	},

	// listdigimon
	dlist: function(userID, callback){
		dbDigimon.listDigimon(function(result){
			var content = {
				"color": 14285739, 
				"title": "listdigimon",
				"description": result
			};
			callback(content)
		});
	},

	// listrandomdigimon
	rlist: function(userID, args, callback){
		dbRandom.listDigimon(args, function(result){
			var content = {
				"color": 14285739, 
				"title": "list random digimon page " + args[0],
				"description": result
			};
			callback(content)
		});
	},
}// end