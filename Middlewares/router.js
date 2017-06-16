'use strict'
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const chatroomsController = require('../controllers/chatroomsController');
const views = '../views/';

router.get('/', function(req, res) {
    res.render(views + 'index');
});

router.get('/register', function (req, res) {
    res.render(views + 'register/index');

});

router.get('/anonymous', function(req, res) {
    res.render(views + 'anonymous/index');
});

router.get('/chatrooms/:id', chatroomsController.index);

//Handle POST requests
router.post('/chatrooms/sendMessage', chatroomsController.sendMessage);
router.post('/chatrooms/createRoom', chatroomsController.createRoom);
router.post('/chatrooms/sendInvitation', chatroomsController.sendInvitation);
router.post('/register', accountController.register);	 // On submit the register form
router.post('/', accountController.login);               // On submit the login form

// 404 NOT FOUND
router.get('*', function(req, res) {
	res.send('not found!');
});




module.exports = router;