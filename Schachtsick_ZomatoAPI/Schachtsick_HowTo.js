/* Author: Jeffrey Schachtsick
CS 290 - Web Development
Zomato API Interactions 
Date: 03/02/2016
Subject: HTML for the How-To */

var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret:'SuperSecretPassword'}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3003);

app.get('/',function(req,res){
  res.render('HowTo-home');
});

app.get('/HowTo-home',function(req,res){
  res.render('HowTo-home');
});

app.get('/HowTo-setup',function(req,res){
  res.render('HowTo-setup');
});

app.get('/HowTo-query',function(req,res){
  res.render('HowTo-query');
});

app.get('/HowTo-pop',function(req,res){
  res.render('HowTo-pop');
});

app.get('/HowTo-collect',function(req,res){
  res.render('HowTo-collect');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://52.10.125.87:' + app.get('port') + '; press Ctrl-C to terminate.');
});