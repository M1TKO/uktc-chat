/*
 Handle user security functionality such as
 generating salts and hashes passwords.
 */

const bcrypt = require('bcrypt');
const config = require('./config');

// Hash password with the salt
exports.hashPassword = (password, callback) => {
    let saltRounds = config.passwordHashing.saltRounds; // get saltRounds from the config file
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            callback(err, hash, salt);
        });
    });
};

// On login, hash is retrieved from the DB
exports.comparePassAndHash = (password, hash, callback) => {
    bcrypt.compare(password, hash, function (err, match) {
        if (err) console.log(err);
        callback(match);      //returns true or false
    });
}