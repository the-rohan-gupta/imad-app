var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/article-one',function(req,res)
{
   res.sendFile(path.join(__dirname,'ui','article-one.html'));
});


//**********************counter
var counter=0;
app.get('/counter', function(req,res){
    counter++;
   res.send(counter.toString()); 
});



//****************names add
var names=[];
app.get('/submit-name',function(req,res)
{
	var name=req.query.name;
	names.push(name);
	res.send(JSON.stringify(names));
});





//*************connect to database
var Pool=require('pg').Pool;

var config=
{
    user:'guptarohan1711' ,
    database:'guptarohan1711' ,
    host:'http://db.imad.hasura-app.io' ,
    port:'5432' ,
    password:process.env.DB_PASSWORD,
}



var pool=new Pool(config);
app.get('/test-db',function(req,res)
{
    
    res.send(counter.toString()); 
    
});

















// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
