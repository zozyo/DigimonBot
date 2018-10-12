var Discord = require('discord.io');
var auth = require('./auth.json');

// Configure logger settings
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
  format: combine(
    timestamp()
  ),
  transports: [
    new transports.File({ 
      json: true,
      level:'debug',
      maxsize: 1024 * 1024, // 1M
      filename: 'logs/combined.log',
    })
  ]
})

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

  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  if (message.substring(0, 1) == '!') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];

    args = args.splice(1);
    switch(cmd) {
      // !ping
      case 'ping':
        bot.sendMessage({
          to: channelID,
          message: 'Pong!'
        });
      break;
      // !hello
      case 'hello':
        bot.sendMessage({
          to: channelID,
          message: 'Hello world!'
        });
      break;
      // !logo
      case 'logo':
        bot.uploadFile({
          to: channelID,
          file: "./logo.jpg"
        });
      break;
      case 'myinfo':
        bot.sendMessage({
          to: channelID,
          embed: {
            color: 6826080,
            fields: [{
              name: 'Your info',
              value: 'user: '      + user + '\n' +
                    'userID: '    + userID + '\n' +
                    'channelID: ' + channelID
            }],
          }
        });
      break;
      case 'help':
        bot.sendMessage({
          to: channelID,
          message: 'Under Construction!'
        });
      break;
      default:
        bot.sendMessage({
          to: channelID,
          message: 'Unknown command! Try d!help for command list!'
        });
      // Just add any case commands if you want to..
    }// end of switch
  }// end of if
});//end of message on
