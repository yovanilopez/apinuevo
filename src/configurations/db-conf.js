const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'ro2padgkirvcf55m.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'tdt4qbs4lmxiipi3',
    password: 'px2btcrlipoq0480',
    database: 'v3qgy9nx9g9lj1rq',
    multipleStatements: true
  });

  mysqlConnection.connect(function (err) {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log('Ahora estamos en Linea :D');
    }
  });

  module.exports = mysqlConnection;