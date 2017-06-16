const _ = require('lodash');
const bodyParser = require('body-parser');
const config = require('../config');
const messages = require('../messages');
const db = require('../db');
const auth = require('../authentication');
//====================================================//

exports.register = function (req, res) {
    const error = {
        email: messages.validation.registrationEmail,
        password: messages.validation.registrationPassword,
        passNotMatch: messages.validation.registrationPasswordNotMatch,
        username: messages.validation.registrationUsername,
        usernameTaken: messages.validation.usernameTaken,
        emailTaken: messages.validation.emailTaken
    };

    let input = {
        username: req.body.username,
        password: req.body.password,
        confPassword: req.body.conf_password,
        email: req.body.email
    };

    if (isUsernameValid(input.username)) {                          // Validate username
        if (input.password === input.confPassword) {                // checks if passwords match

            if (isPasswordValid(input.password)) {                  // validates the password
                if (isEmailValid(input.email)) {                    // validates the password
                    if (!db.emailExists(input.email)) {             // checks if email is already taken
                        if (!db.usernameExists(input.username)) {   // checks if the username is already taken
                            //=====  CREATE USER  ======//
                            auth.hashPassword(input.password, (err, hash, salt) => { // Encrypt the password
                                if (!err) {

                                    //TODO: set session logged in here
                                    db.createUser(input.username, hash, input.email); // CREATE USER
                                    console.log('====== ==== DONE ==== =====');

                                } else {
                                    colnsole.log(err);
                                }

                                console.log([input.username, hash, salt, input.email]);
                            });

                        } else {
                            console.log(error.usernameTaken);
                        }
                    } else {
                        console.log(error.emailTaken);
                    }
                } else {
                    console.log(error.email);
                }
            } else {
                console.log(error.password);
            }
        } else {
            console.log(error.passNotMatch);
        }
    } else {
        console.log(error.username);

    }

}

exports.login = function (req, res) {
    let input = {
        username: req.body.username,
        password: req.body.password
    };
    const error = {
        username: messages.validation.loggingUsername,
        password: messages.validation.loggingPassword
    };


    db.getUserDataByName(input.username, (err, result) => {                  // Gets * data for the given Username
        if (!(_.isEmpty(result))) {                                          // Checks if the query got an user object that match
            console.log(result);
            // Compare the given password with the user's salt
            auth.comparePassAndHash(input.password, result.hash, (match) => {
                if (match) {
                    //TODO: set session logged in here
                    console.log('===== User Logged in =====');
                    res.send('===== User Logged in =====');
                } else {
                    console.log(error.password);
                }
            });
        } else {
            console.log(error.username);
        }
    })


}

function isEmailValid(email) {
    // Is the email a valid address?
    let re = config.regex.emailValidation;
    return re.test(email);
}

// Validate the user's chosen display name against a regex
function isUsernameValid(username) {
    let re = config.regex.usernameValidation;
    return re.test(username);
}

// Validate a password is complex enough to be used
function isPasswordValid(password) {
    let re = config.regex.passwordValidation;
    return re.test(password);
}