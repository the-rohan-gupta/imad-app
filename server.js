
var express = require('express');
var morgan = require('morgan');
var path = require('path');

var bodyParser=require('body-parser');

var Pool = require('pg').Pool;

var crypto=require('crypto');

var app = express();

var config={
    user: 'guptarohan1711',
    database: 'guptarohan1711',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};


app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


//connect to database
var pool = new Pool(config);
app.get('/test-db', function (req, res)
{
    //make a select req
    //return a response with the results
    pool.query('SELECT * FROM test', function(err,result)
    {
        if (err) 
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result.row));
        }
    });
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



//articles
app.get('/articles/:articleName',function(req,res)
{
    pool.query("SELECT * FROM article WHERE title = $1",[req.params.articleName],function(err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length===0)
            {
                res.status(404).send('Article not found');
            }
            else
            {
                var articleData=result.rows[0];
               res.send(JSON.stringify(articleData)); 
            }
                
        }
        
    });

});





//hash function
function hash(input,salt)
{
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ['pbkdf2','1000',salt,hashed.toString('hex')].join('$');
}


app.get('/hash/:input',function(req,res)
{
   var hashedString=hash(req.params.input,'efw');
   res.send(hashedString);
});





//creatin database for user login
app.post('/create-user',function(req,res)
{
    
    var username=req.body.username;
    var password=req.body.password;
    
   var salt=crypto.randomBytes(128).toString('hex');
   var dbString=hash(password,salt); 
   pool.query('INSERT into "user"(username,password) values($1,$2)',[username,dbString], function(err,result)
    {
        if (err) 
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send('successfully login'+username);
        }
    });
});









app.post('/login',function(req,res)
{
   var username=req.body.username;
   var password=req.body.password;
   pool.query('SELECT * from "user" WHERE username=$1',[username],function(err,result)
   {
       if(err)
       {
           res.status(500).send('hahahha');
       }
       else
       {
          /* var dbString=result.row[0].password;
           var salt=dbString.split('$')[2];
           var hashPassword=hash(password,salt);
           
           if(hashPassword===dbString)
           {
               res.send('correct');
           }
           else
           {
               res.send('invalid');*/
               res.send(result.toString());
           }
       }
   });
});






















// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
