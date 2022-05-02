const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'teste',
    database: 'bancopet'
});

connection.connect(function(error){
    if(error){
        console.log(error);
    }
    else{
        console.log('Conectado ao banco!');
    }
});

module.exports = connection;