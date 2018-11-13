//requires
var dbp = require('../models/db_player.js')
	, dbd = require('../models/db_digimon.js')
	, dbrandom = require('../models/db_random_digimon.js')
	, randomGen = require('../models/random_gen.js');

//test cases
module.exports = {
	// listplayer
	plist: function(user, userID, channelID, args, callback){
		dbp.listPlayer(function(result){
			var content = {
				"color": 14285739, 
				"title": "listplayer",
				"description": result
			};
			callback(content)
		});
	},

	// listdigimon
	dlist: function(user, userID, channelID, args, callback){
		dbd.listDigimon(function(result){
			var content = {
				"color": 14285739, 
				"title": "listdigimon",
				"description": result
			};
			callback(content)
		});
	},

	// listrandomdigimon
	rlist: function(user, userID, channelID, args, callback){
		dbrandom.listDigimon(userID, args, function(result){
			var content = {
				"color": 14285739, 
				"title": "list random digimon page " + args[0],
				"description": result
			};
			callback(content)
		});
	},
}//end