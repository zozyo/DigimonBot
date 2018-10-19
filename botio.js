//requires
var Discord = require('discord.io');
var auth = require('./auth.json');
var Cases = require('./botcase.js');

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
	if (message.substring(0, 2) == 'd!') {
		//logs
		logger.info(user + " - " + userID + " in " + channelID);
		logger.info(message);

		// bot replay in different cases
		const commands = splitMessage(message);
		console.log(commands);
		if (commands) {
			Cases[commands.cmd](user, userID, channelID, commands.args, function (content) {
				bot.sendMessage({
					to: channelID,
					embed: content
				});
			});
		} else {
			bot.sendMessage({
				to: channelID,
				embed: {
					"color": 12345678,
					"fields": [{
						"name": "Unknown command!",
						"value": "Try d!help for command list!"
					}]
				}
			});
		}
	}
});//end of message on

function splitMessage(message) {
	//split message
	const msg = message.substring(2).split(' ');
	const cmd = msg[0];
	const args = msg.splice(1);

	console.log(Cases);
	console.log(Cases.cmd);
	// check the command exists
	if (typeof Cases.cmd === 'function') {
		return { cmd, args };
	} else {
		return null;
	}
}