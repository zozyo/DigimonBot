var addNumber = require('./addNumber.js');
//var db        = require('./db.js');

// Our bot needs to know if it will execute a command
// It will listen for messages that will start with `d!`
exports.cases = function (user, userID, channelID, message, evt, callback) {
	if (message.substring(0, 2) == 'd!') {
		var args = message.substring(2).split(' ');
		var cmd = args[0];
		args = args.splice(1);

		var content = '{0}';

		switch(cmd) {
		// !ping
		case 'ping':
			content = '{"to": channelID, "embed": { "color": 12345678, "fields": [{ "value": "Pong!" }]}}';
		break;
		// !hello
		case 'hello':
			content = {"content": "this `supports` __a__ **subset** *of* ~~markdown~~ 😃 ```js\nfunction foo(bar) {\n  console.log(bar);\n}\n\nfoo(1);```",
  "embed": {
    "title": "title ~~(did you know you can have markdown here too?)~~",
    "description": "this supports [named links](https://discordapp.com) on top of the previously shown subset of markdown. ```\nyes, even code blocks```",
    "url": "https://discordapp.com",
    "color": 8405556,
    "timestamp": "2018-10-17T06:33:05.924Z",
    "footer": {
      "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
      "text": "footer text"
    },
    "thumbnail": {
      "url": "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    "image": {
      "url": "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    "author": {
      "name": "author name",
      "url": "https://discordapp.com",
      "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    "fields": [
      {
        "name": "🤔",
        "value": "some of these properties have certain limits..."
      },
      {
        "name": "😱",
        "value": "try exceeding some of them!"
      },
      {
        "name": "🙄",
        "value": "an informative error should show up, and this view will remain as-is until all issues are fixed"
      },
      {
        "name": "<:thonkang:219069250692841473>",
        "value": "these last two",
        "inline": true
      },
      {
        "name": "<:thonkang:219069250692841473>",
        "value": "are inline fields",
        "inline": true
      }
    ]
  }};
		break;
		// !logo
		case 'logo':
			content = {
				"color": 12345678,
				"image": {
					"url": "./logo.jpg"
				},
			};
		break;
		case 'myinfo':
			content = {
				"color": 12345678,
				"title": 'Your Info',
				"fields": [
					{
						"name": 'user',
						"value": user
					},
					{
						"name": 'userID',
						"value": userID
					},
					{
						"name": 'channelID',
						"value": channelID
					},
					{
						"name": 'evt',
						"value": evt
					},
				],
			};
		break;
		case 'help':
			content = {
				"color": 12345678,
				"fields": [{
					"value": 'Under Construction!'
				}],
			};
		break;
		case 'add':
			content = {
				"color": 12345678,
				"fields": [{
					"value": addNumber.add(args[0], args[1])
				}],
			};
		break;
		// Just add any case commands if you want to..
		default:
			content = {
				"color": 12345678,
				"fields": [{
					"value": 'Unknown command! Try d!help for command list!'
				}],
			};
		}// end of switch
	}// end of if
	
	callback(content);
}//end of cases