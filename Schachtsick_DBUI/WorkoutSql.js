/* Author: Jeffrey Schachtsick
CS 290 - Web Development
HW Activity: Database interactions and UI
Date: 03/01/2016
Subject: Javascript to interact with a database UI */

var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

// Generate rows
app.get('/',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    var qParams = [];
	for (var p in rows){
		qParams.push({'id': JSON.stringify(rows[p].id), 'name': JSON.stringify(rows[p].name), 'reps': JSON.stringify(rows[p].reps), 'weight': JSON.stringify(rows[p].weight), 'measure': JSON.stringify(rows[p].measure), 'date': JSON.stringify(rows[p].date)})
	}
	context.dataList = qParams;
	context.results = JSON.stringify(rows);
	res.render('home',context);
	console.log(context.results);
  });
});

// Insert a row.  Need to make sure that everything gets entered.
app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `measure`) VALUES (?, ?, ?, ?, ?)", [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.measure], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home',context);
  });
});

// Make an update to a row
app.get('/edit',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, measure=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.reps || curVals.reps, req.query.weight || curVals.weight, req.query.date || curVals.date, req.query.measure || curVals.measure, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('home',context);
      });
    }
  });
});

// Delete a row
app.get('/delete', function(req, res, next) {
    var context = {};
    mysql.pool.query("DELETE FROM workouts WHERE id = ?", [req.query.id], function(err, result) {
        if(err){
            next(err);
            return;
        }
        mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
            if(err){
                next(err);
                return;
            }
			 
			context.results = JSON.stringify(rows);
			res.render('home',context);
        });   
    });
});

// Reset the table to fresh
app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "measure BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});



/*function addButton(){
	document.getElementById('addSubmit').addEventListener('click', function(event){
	var req = new XMLHttpRequest();
	var data = {name:null};
	var data = {reps:null};
	var data = {weight:null};
	var data = {date:null};
	var data = {measure:null};
	data.name = document.getElementById('name').value;
	data.reps = document.getElementById('reps').value;
	data.weight = document.getElementById('weight').value;
	data.date = document.getElementById('date').value;
	data.measure = document.getElementById('measure').value;
	req.open("GET", "http://52.10.125.87" + app.get('port') + "/insert?name=" + data.name + "&reps=" + data.reps + "&weight=" + data.weight + "&date=" + data.date + "&measure=" + data.measure, true);
		req.addEventListener('load', function(){
			if(req.status >= 200 && req.status < 400){
				var response = JSON.parse(req.responseText);
				//console.log(JSON.parse(req.responseText));
				document.getElementById('city').textContent = response.name;
				document.getElementById('temp').textContent = response.main.temp;
				document.getElementById('humid').textContent = response.main.humidity;
			} else {
				console.log("Error in network request: " + request.statusText);
			}
		});
		req.send(null);
		event.preventDefault();
	})
};*/