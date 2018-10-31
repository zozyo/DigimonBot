//requires
var addNumber = require('./addNumber.js')
	, dbp = require('./db_player.js')
	, dbd = require('./db_digimon.js');

// Our bot needs to know if it will execute a command
// It will listen for messages that will start with `d!`
module.exports = {
	// ping
	ping: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678, 
			"description": "Pong!"
		};
		callback(content);
	},

	//hello
	hello: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678, 
			"title": "Hello world!"
		};
		callback(content)
	},

	//logo
	logo: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://vignette.wikia.nocookie.net/doblaje/images/3/3a/Digimon.gif/revision/latest?cb=20150830013427&path-prefix=es"
			}
		};
		callback(content);
	},

	//testing images
	agumon: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://orig00.deviantart.net/20d3/f/2015/347/f/5/digimon_adventure_tri____agumon_render_by_sou_the_cat-d9jzysc.png"
			}
		};
		callback(content);
	},

	greymon: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://vignette.wikia.nocookie.net/digimon-adventure5140/images/c/ca/Greymon_tri.png/revision/latest?cb=20171010042426"
			}
		};
		callback(content);
	},
	gabumon: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://vignette.wikia.nocookie.net/universosteven/images/f/fd/Gabumon.png/revision/latest?cb=20161113145227&path-prefix=es"
			}
		};
		callback(content);
	},
	garuromon: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://vignette.wikia.nocookie.net/digimon-adventure5140/images/4/49/Garurumon_tri.png/revision/latest?cb=20170913165523"
			}
		};
		callback(content);
	},
	tentomon: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://wikimon.net/images/thumb/3/34/Tentomon_adventure_fes_2017.png/180px-Tentomon_adventure_fes_2017.png"
			}
		};
		callback(content);
	},
	kabuterimon: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://4.bp.blogspot.com/-M9mN9V8akIM/UVNUKm8SOOI/AAAAAAAAO8w/G2-OH3PUCXA/s1600/kabuterimon.png"
			}
		};
		callback(content);
	},
	gomamon: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://vignette.wikia.nocookie.net/beastwarstransformers/images/d/da/Gomamon_Tri.png/revision/latest?cb=20170903103833"
			}
		};
		callback(content);
	},
	ikkakumon: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "vhttps://static.comicvine.com/uploads/original/11133/111335576/6488261-ikkakumon_by_million_mons_project-dbacmew.png"
			}
		};
		callback(content);
	},
	patamon: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://pre00.deviantart.net/f56a/th/pre/f/2016/267/c/f/patamon_by_cristian_kali-daiqswv.png"
			}
		};
		callback(content);
	},
	angemon: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://banner2.kisspng.com/20180406/hxw/kisspng-angemon-gatomon-patamon-digimon-adventure-tri-priest-5ac7b57511f7f4.9753060515230375570736.jpg"
			}
		};
		callback(content);
	},
	biyomon: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://orig00.deviantart.net/dfa1/f/2014/303/1/b/my_first_vector_of__biyomon__by_flutterflyraptor-d84qr1s.png"
			}
		};
		callback(content);
	},
	birdramon: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://vignette.wikia.nocookie.net/p__/images/8/8a/Birdramon_tri.png/revision/latest?cb=20170317060410&path-prefix=protagonist"
			}
		};
		callback(content);
	},
	palmon: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://banner2.kisspng.com/20180424/wqw/kisspng-palmon-digimon-digivolution-mimi-tachikawa-gomamon-green-plant-5adf09f6971b55.6272237115245665186189.jpg"
			}
		};
		callback(content);
	},
	togemon: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://banner2.kisspng.com/20180426/ikq/kisspng-togemon-digimon-adventure-tri-cactaceae-clip-art-harajuku-style-5ae1ef035d9f81.0243137515247562273835.jpg"
			}
		};
		callback(content);
	},
	gatomon: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://i.pinimg.com/originals/bc/0b/01/bc0b014795e61bc44ef94cf98c251423.jpg"
			}
		};
		callback(content);
	},
	angewonmon: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"image": {
				"url": "https://banner2.kisspng.com/20180409/tsq/kisspng-gatomon-angemon-digimon-angewomon-kari-kamiya-digimon-5acaf5b0cd3e30.5224375915232506088407.jpg"
			}
		};
		callback(content);
	},
	// show user info for future use in database
	myinfo: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"title": "Your Info",
			"fields": [
				{
					"name": "user",
					"value": user
				},
				{
					"name": "userID",
					"value": userID
				},
				{
					"name": "channelID",
					"value": channelID
				}
			]
		};
		callback(content);
	},

	// help menu
	help: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"fields": [{
				"name": "Help",
				"value": "Under Construction!"
			}]
		};
		callback(content);
	},

	// Addition Calculator, testing for require
	add: function(user, userID, channelID, args, callback){
		var content = {
			"color": 12345678,
			"fields": [{
				"name": "Addition Calculator",
				"value": addNumber.add(args[0], args[1])
			}]
		};
		callback(content);
	},

	// temporary database insert
	addplayer: function(user, userID, channelID, args, callback){
		dbp.addPlayer(userID, function(result){
			var content = {
				"color": 12345678,
				"title": "addplayer",
				"description": result
			};
			callback(content)
		});
	},

	// temporary database search
	listplayer: function(user, userID, channelID, args, callback){
		dbp.listPlayer(function(result){
			var content = {
				"color": 14285739, 
				"title": "listplayer",
				"description": result
			};
			callback(content)
		});
	},

	//temporary database delete
	deleteplayer: function(user, userID, channelID, args, callback){
		dbp.deletePlayer(userID, function(result){
			var content = {
				"color": 12345678, 
				"title": "deleteplayer",
				"description": result
			};
			callback(content)
		});
	},

	//adddigimon
	adddigimon: function(userID, userID,channelID, args, callback){
		dbd.addDigimon(userID, args, function(result){
			var content = {
				"color": 12345678,
				"title": "adddigimon",
				"description": result
			};
			callback(content)
		})
	},

	//listdigimon
	listdigimon: function(user, userID, channelID, args, callback){
		dbd.listDigimon(function(result){
			var content = {
				"color": 14285739, 
				"title": "listdigimon",
				"description": result
			};
			callback(content)
		});
	},

	//deletedigimon
	deletedigimon: function(user, userID, channelID, args, callback){
		dbd.deleteDigimon(userID, args, function(result){
			var content = {
				"color": 12345678, 
				"title": "deletedigimon",
				"description": result
			};
			callback(content)
		});
	}
	//add more
}// end of cases