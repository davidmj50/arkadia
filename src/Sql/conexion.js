var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "Arkadia",
    password: "123456",
    database: "db_arkadia"
});

con.connect(function(err){
    if (err) throw err;
    console.log("Connected!");

     var sql = "INSERT INTO tbl_contactenos (Email, Mensaje) VALUES ('arkadiatc@hotmail.com', 'Este es email de prueba')";

    con.query(sql, function (err, result) {
       if (err) throw err;
       console.log("1 record inserted, ID: " + result.insertId);
    });
});