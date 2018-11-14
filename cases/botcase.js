//requires
var Player = require('./player_case.js')
	,Admin = require('./admin_case.js')
	,Test  = require('./test_case.js')
	,BaseDigimon = require('./base_digimon_case.js')
	,RandomDigimon = require('./random_digimon_case.js');

// Our bot needs to know if it will execute a command
// It will listen for messages that will start with `d!`
module.exports = {

//player cases
	// ping
	ping: function(user, userID, channelID, args, callback) {
		Player["ping"](callback);
	},

	//start
	start: function(user, userID, channelID, args, callback) {
		Player["start"](userID, callback);
	},

	// show user info
	myinfo: function(user, userID, channelID, args, callback) {
		Player["myInfo"](user, userID, callback);
	},

	// help menu
	help: function(user, userID, channelID, args, callback) {
		Player["help"](callback);
	},

	// choose digimonName
	choose: function(user, userID, channelID, args, callback) {	
		Player["choose"](userID, args, callback);
	},

	// deleteme
	deleteme: function(user, userID, channelID, args, callback) {
		Player["deleteme"](userID, callback);
	},

//test cases
	// listplayer
	plist: function(user, userID, channelID, args, callback) {
		Test["plist"](userID, args, callback);
	},

	// listdigimon
	dlist: function(user, userID, channelID, args, callback) {
		Test["dlist"](userID, callback);
	},

	// listrandomdigimon
	rlist: function(user, userID, channelID, args, callback) {
		Test["rlist"](userID, args, callback);
	},

//digimon database cases
	//adddigimon name next HP Atk Def picURL
	dadd: function(user, userID, channelID, args, callback) {
		BaseDigimon["dadd"](userID, args, callback);
	},

	//showdigimon name
	dshow: function(user, userID, channelID, args, callback) {
		BaseDigimon["dshow"](userID, args, callback);
	},

	//deletedigimon name
	ddel: function(user, userID, channelID, args, callback) {
		BaseDigimon["ddel"](userID, args, callback);
	},

//random digimon database cases
	//add random digimon
	//insert name stage HP Atk Def Critical Evade picURL
	radd: function(user, userID, channelID, args, callback) {
		RandomDigimon["radd"](userID, args, callback);
	},

	rshow: function(user, userID, channelID, args, callback) {
		RandomDigimon["rshow"](userID, args, callback);
	},

	rdel: function(user, userID, channelID, args, callback) {
		RandomDigimon["rdel"](userID, args, callback);
	},

//admin cases
	//rendom gen set
	settimer: function(user, userID, channelID, args, callback) {
		Admin["settimer"](userID, args, callback);
	},

	//add more
}// end of cases