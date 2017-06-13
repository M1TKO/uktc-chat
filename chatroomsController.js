var mysql = require('mysql');
var db = require('../db');
var bodyParser = require('body-parser');
var msg = {
		text: req.body.text
		};
function index(){
    
};

function createRoom(req, res) {
	name = req.body.name;
	db.createRoom(name);
	console.log("Room created!!!");
};

function sendInvitation(){

};

function sendMessage(){
let length = db.getData(text, 'text', 'messages');
		if (length > 0) return true;
		else return false;
		let profiles_Id =1;
		db.query(queries.insertMsg, chatroom_Id[], profiles_Id[], text[]);
};

function chatRoomMessages(){

};

exports.index = index; 
exports.createRoom = createRoom;
exports.sendInvitation = sendInvitation;
exports.sendMessage = sendMessage;
