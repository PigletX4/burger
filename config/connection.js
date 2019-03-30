var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Youreprettygood1!",
    database: "burger_db"
});

connection.connect(function(err) {
    if (err) {
        console.error("connection error: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;