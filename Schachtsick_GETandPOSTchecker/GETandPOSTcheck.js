var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

/*app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());*/

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
  res.render('home');
});

app.get('/looper',function(req,res){
  //var titleLabel = {};
  var title = {'GET'};
  //res.render('looper', titleLabel);
  
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.titleLabel = title;
  context.dataList = qParams;
  res.render('looper', context);
});

/*app.post('/looper', function(req,res){
  var titleLabel = {};
  titleLabel.title = 'POST';
  res.render('looper', titleLabel);
  var qParams = [];
  for (var p in req.body){
    qParams.push({'name':p,'value':req.body[p]})
  }
  console.log(qParams);
  console.log(req.body);
  var context = {};
  context.dataList = qParams;
  res.render('looper', context);
});*/

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
  console.log('Express started on http://52.10.125.87/' + app.get('port') + '; press Ctrl-C to terminate.');
});