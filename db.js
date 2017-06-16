const config = require('./config');
const mysql = require('mysql');
var pool = null;

queries = {
    emailExists: "SELECT * FROM profiles WHERE email = ?",
    usernameExists: "SELECT * FROM profiles WHERE username = ?",
    createUser: "INSERT INTO profiles (username, hash, email) VALUES (?, ?, ?)",
    createRoom: "INSERT INTO chatrooms (name) VALUES ?",
    getChatroomMessages: "SELECT text FROM messages WHERE chatroom_Id = ? ORDER BY createdAt DESC LIMIT 20"
}

// Returns connection  -  if there is no connection it makes and return the connection to the db
getPool = () => {
    if (pool === null) {
        console.log("Initializing MySQL connection pool");
        pool = mysql.createPool(config.database);
        return pool;
    } else {
        return pool;
    }
}

getConn = (callback) => {
    getPool().getConnection((err, connection) => {
        callback(err, connection);
    });
};

makeQuery = (query, val, callback) => {
    getConn((err, connection) => {
        if (err) console.log(err);
        connection.query(query, val, (err, result) => {
            if (err) console.log(err);
            callback(err, result);
        });
    });
}


//=========== QUERIES  =============//
exports.emailExists = (email) => {
    makeQuery(queries.emailExists, [email], function (err, result) {
        if ([result].count < 1) {
            return false;
        } else {
            return true;
        }
    })
}

exports.usernameExists = (username) => {
    makeQuery(queries.usernameExists, [username], function (err, result) {
        if ([result].count < 1) {
            return false;
        } else {
            return true;
        }
    })
}

exports.createUser = (username, hash, email) => {
    let values = [username, hash, email];
    makeQuery(queries.createUser, values, (err, result) => {
        console.log('===== User registered ====')
        console.log(result);
    });
}

exports.getUserDataByName = (username, callback) => {
    makeQuery(queries.usernameExists, [username], (err, result) => {
        if (err) console.log(err);
        if (callback && typeof(callback) === "function") {
            callback(err, result[0]);
        }
    })
}

exports.chatroomMessages = (chatroom_Id) => {
    makeQuery(queries.getChatroomMessages, chatroom_Id, (err,res) => {
        if (err) console.log(err);
        console.log(res);
    });
}

exports.createRoom = (name) => {
    makeQuery(queries.createRoom, name, (err, res) => {
        if (err) console.log(err);
        console.log(res);
    });
}
