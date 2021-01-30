let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "matteo",
    password: "satteo!Britain13a"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});