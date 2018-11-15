//requires
var dbBattlePlayer = require('../models/db_battle_player.js');

//battle cases
module.exports = {
	//bp
	bp: function(user, userID, args, callback) {
		dbBattlePlayer.startBattle(userID, args, function(res){
			//callback(res);
		});
	}


}//end