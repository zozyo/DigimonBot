//requires
var player = require('./player_case.js')
	,admin = require('./admin_case.js')
	,test  = require('./test_case.js')
	,baseDigimon = require('./base_digimon_case.js')
	,randomDigimon = require('./random_digimon_case.js');

// Our bot needs to know if it will execute a command
// It will listen for messages that will start with `d!`
module.exports = {

//player cases
	// ping
	ping: function(user, userID, channelID, args, callback){
		player[ping](callback);
	},

	//start
	start: function(user, userID, channelID, args, callback){
		player[start](userID, callback);
	},

	// show user info
	myinfo: function(user, userID, channelID, args, callback){
		player[myInfo](userID, callback);
	},

	// help menu
	help: function(user, userID, channelID, args, callback){
		player[help](callback);
	},

	// choose digimonName
	choose: function(user, userID, channelID, args, callback){	
		player[choose](userID, args, callback);
	},

	// deleteme
	deleteme: function(user, userID, channelID, args, callback){
		player[deleteme](callback);
	},

//test cases
	// listplayer
	plist: function(user, userID, channelID, args, callback){
		test[plist](userID, args, callback);
	},

	// listdigimon
	dlist: function(user, userID, channelID, args, callback){
		test[dlist](userID, callback);
	},

	// listrandomdigimon
	rlist: function(user, userID, channelID, args, callback){
		test[rlist](userID, args, callback);
	},

//digimon database cases
	//adddigimon name next HP Atk Def picURL
	dadd: function(user, userID, channelID, args, callback){
		baseDigimon[dadd](userID, args, callback);
	},

	//showdigimon name
	dshow: function(user, userID, channelID, args, callback){
		baseDigimon[dshow](userID, args, callback);
	},

	//deletedigimon name
	ddel: function(user, userID, channelID, args, callback){
		baseDigimon[ddel](userID, args, callback);
	},

//random digimon database cases
	//add random digimon
	//insert name stage HP Atk Def Critical Evade picURL
	radd: function(user, userID, channelID, args, callback){
		randomDigimon[radd](userID, args, callback);
	},

	rshow: function(user, userID, channelID, args, callback){
		randomDigimon[rshow](userID, args, callback);
	},

	rdel: function(user, userID, channelID, args, callback){
		randomDigimon[rdel](userID, args, callback);
	},

//admin cases
	//rendom gen set
	settimer: function(user, userID, channelID, args, callback){
		admin[settimer](userID, args, callback);
	},

	//add more
}// end of cases