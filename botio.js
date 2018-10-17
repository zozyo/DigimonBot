var Discord  = require('discord.io');
var auth     = require('./auth.json');
var botcase = require('./botcase.js');

// Configure logger settings
const { createLogger, format, transports }       = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
	format: combine(
		timestamp(),
		prettyPrint(),
	),
	transports: [
		new transports.Console(),
		new transports.File({ 
			json: true,
			level:'debug',
			maxsize: 1024 * 1024, // 1M
			filename: 'logs/combined.log',
		}),
	],
});

// Initialize Discord Bot
var bot = new Discord.Client({
	token: auth.token,
	autorun: true
});
bot.on('ready', function (evt) {
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
	logger.info("----------");
});
bot.on('message', function (user, userID, channelID, message, evt) {
	//log
	logger.info(user + " - " + userID);
	logger.info("in " + channelID);
	logger.info(message);
	logger.info("----------");

	var content = JSON.stringify(botcase.cases(user, userID, channelID, message, evt));
	console.log(content);
	bot.sendMessage({
		to: channelID,
		embed: {content}
	});

});//end of message on
