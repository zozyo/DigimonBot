var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();

exports.setTime = function (userID, args, callback){
	rule.minute = parseInt(args[0]);
	schedule.scheduleJob(rule, function(){
  		callback('Random gen!');
	});
};