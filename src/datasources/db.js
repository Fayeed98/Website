//local mysql db connection
var mysql = require('mysql');
var pool = mysql.createPool({
    host     : 'flexiworkmy.mysql.database.azure.com',
    user     : 'fayeed@flexiworkmy',
    password : 'Pwc#123456789',
    database: 'flexiwork',
    connectionLimit : 100
});

module.exports = pool;