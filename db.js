const config = require('./config');
var pool = null;
var mysql = require('mysql');

queries = {
    getEmai: "SELECT email FROM profiles WHERE email = ?",
    getUsername: "SELECT username FROM profiles WHERE username = ?",
    createUser: "INSERT INTO profiles (username, password, salt, email) VALUES ?",
    createRoom: "INSERT INTO chatrooms (name) VALUES ?",
    getData: "SELECT ? FROM ? WHERE ? = ?",
    chatroomMessages: "SELECT text FROM messages WHERE chatroom_Id = ? ORDER BY createdAt DESC LIMIT 20"
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
        connection.release();
    });
};

makeQuery = (query, val, callback) => {
    getConn((err, conn) => {
        if (err) console.log(err);
        conn.query(query, val, (err, result) => {
            if (err) console.log(err);
            callback(err, result);
        });
    });
}


//=========== QUERIES  =============//
exports.chatroomMessages = (chatroom_Id) => {
    makeQuery(queries.chatroomMessages, chatroom_Id, (err,res) => {
        if (err) console.log(err);
        console.log(res);
    });
}
exports.getData = (data, col, table) => {
    let values = [col, table, col, data];
    makeQuery(queries.getData, values, (err, result) => {
        if (err) console.log(err);
        return result;
    });
}

exports.createUser = (username, password, salt, email) => {
    values = [username, password, salt, email];
    makeQuery(queries.createUser, values, (err, res) => {
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
module.exports