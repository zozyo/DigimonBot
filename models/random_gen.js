var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();

exports.setTime = function (userID, args, callback){
	console.log(args[0]);
	rule.second = parseInt(args[0]);
	schedule.scheduleJob(rule, function(){
  		callback('The answer to life, the universe, and everything!');
	});
};