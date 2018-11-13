//requires
var schedule = require('node-schedule')
	, dbrandom = require('./db_random_digimon.js');

//new schedule
var rule = new schedule.RecurrenceRule();

//set schedule time
exports.setTime = function (userID, args, callback){
	//set schedule minute
	rule.minute = parseInt(args[0]);
	//do functions
	schedule.scheduleJob(rule, function(){
		//random gen a digimon
		dbrandom.randomGen(function(res){
			//insert digimon into battle_random
			// To Do


			//print the digimon
			callback(res);
		})
	});
};//end of setTime