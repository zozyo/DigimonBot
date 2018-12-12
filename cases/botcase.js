// requires
var Player = require('./player_case.js')
	,Admin = require('./admin_case.js')
	,Test  = require('./test_case.js')
	,BaseDigimon = require('./base_digimon_case.js')
	,RandomDigimon = require('./random_digimon_case.js')
	,BattlePlayer = require('./battle_player_case.js')
	,BattleRandom = require('./battle_random_case.js');

// Our bot needs to know if it will execute a command
// It will listen for messages that will start with `d!`
module.exports = {

// player cases
	// ping
	ping: function(user, userID, channelID, args, callback) {
		Player["ping"](callback);
	},

	// start
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

// test cases
	// plist
	plist: function(user, userID, channelID, args, callback) {
		Test["plist"](userID, args, callback);
	},

	// dlist
	dlist: function(user, userID, channelID, args, callback) {
		Test["dlist"](userID, callback);
	},

	// rlist
	rlist: function(user, userID, channelID, args, callback) {
		Test["rlist"](userID, args, callback);
	},

// digimon database cases
	// dadd name stage HP Atk Def Critical Evade picURL
	dadd: function(user, userID, channelID, args, callback) {
		BaseDigimon["dadd"](userID, args, callback);
	},

	// dshow name
	dshow: function(user, userID, channelID, args, callback) {
		BaseDigimon["dshow"](userID, args, callback);
	},

	// ddel name
	ddel: function(user, userID, channelID, args, callback) {
		BaseDigimon["ddel"](userID, args, callback);
	},

// random digimon database cases
	// radd name stage HP Atk Def Critical Evade picURL
	radd: function(user, userID, channelID, args, callback) {
		RandomDigimon["radd"](userID, args, callback);
	},

	// rshow name
	rshow: function(user, userID, channelID, args, callback) {
		RandomDigimon["rshow"](userID, args, callback);
	},

	// rdel name
	rdel: function(user, userID, channelID, args, callback) {
		RandomDigimon["rdel"](userID, args, callback);
	},

// admin cases
	// rendom gen set
	settimer: function(user, userID, channelID, args, callback) {
		Admin["settimer"](userID, args, callback);
	},

	deleteplayerbattle: function(user, userID, channelID, args, callback) {
		Admin["deleteplayerbattle"](userID, callback);
	},

	deleterandombattle: function(user, userID, channelID, args, callback) {
		Admin["deleterandombattle"](userID, callback);
	},

// battle player cases
	// bp
	bp: function(user, userID, channelID, args, callback) {
		BattlePlayer["bp"](user, userID, args, callback);
	},

	// accept
	accept: function(user, userID, channelID, args, callback) {
		BattlePlayer["accept"](user, userID, callback);
	},

	// attack
	attack: function(user, userID, channelID, args, callback) {
		BattlePlayer["attack"](user, userID, callback);
	},

	// surrender
	surrender: function(user, userID, channelID, args, callback) {
		BattlePlayer["surrender"](user, userID, callback);
	},

// battle random cases
	// br
	br: function(user, userID, channelID, args, callback) {
		BattleRandom["br"](user, userID, callback);
	},

	// attack
	rattack: function(user, userID, channelID, args, callback) {
		BattleRandom["rattack"](user, userID, callback);
	},

	// surrender
	rsurrender: function(user, userID, channelID, args, callback) {
		BattleRandom["rsurrender"](user, userID, callback);
	},

}// end of cases