var schedule = require('node-schedule')
	, dbrandom = require('./db_random_digimon.js');

var rule = new schedule.RecurrenceRule();

exports.setTime = function (userID, args, callback){
	rule.minute = parseInt(args[0]);
	schedule.scheduleJob(rule, function(){
		dbrandom.randomGen(function(res){
			callback(res);
		})
	});
};