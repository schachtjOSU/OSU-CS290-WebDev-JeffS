/* Author: Jeffrey Schachtsick
CS 290 - Web Development
HW Activity: Database interactions and UI
Date: 03/01/2016
Subject: Javascript to interact with a database UI */

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'student',
  password        : 'default',
  database        : 'student'
});

module.exports.pool = pool;