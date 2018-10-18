//requires
var Discord = require('discord.io');
var auth	= require('./auth.json');
var botcase = require('./botcase.js');

// Configure logger settings
const { createLogger, format, transports }       = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
	format: combine(
		timestamp(),
		prettyPrint()
	),
	transports: [
		new transports.Console(), //show logs in console
		new transports.File({ // save logs to file
			json: true,
			level:'debug',
			maxsize: 1024 * 1024, // 1M per log
			filename: 'logs/combined.log', // log file path
		}),
	],
});

// Initialize Discord Bot
var bot = new Discord.Client({
	token: auth.token,
	autorun: true
});
// bot ready
bot.on('ready', function (evt) {
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
	logger.info("----------");
});
// message listener
bot.on('message', function (user, userID, channelID, message, evt) {
	//logs
	logger.info(user + " - " + userID);
	logger.info("in " + channelID);
	logger.info(message);
	logger.info("----------");

	// bot replay in different cases
	botcase.cases(user, userID, channelID, message, evt, function (content) {
		bot.sendMessage({
			to: channelID,
			embed: content
		});
	});
});//end of message on
