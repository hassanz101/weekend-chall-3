var express = require ('express');
var app = express();
var bodyParser = require ('body-parser');
var path = require ('path');
var pg = require('pg');

var port = 7654;

var config = {
  database: 'todolist',
  host: 'localhost',
  port: 5432
};

var pool = new pg.Pool( config );

//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

//create server
app.listen(port, function(){
  console.log('server up on : ', port);
});

//GET PATH
app.get('/', function(req, res){
  console.log('finding the html');
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

//app.get Get list items
app.get ('/getList', function(req, res){
  console.log('get List route hit' );

    var allListItems = [];

    pool.connect(function( err, connection, done){
      if ( err ){
        console.log( err );
        res.sendStatus(400);
      } else {
        console.log('connected to db');
       var resultSet = connection.query("SELECT * FROM tasks");
       resultSet.on( 'row', function( row ) {
         allListItems.push( row );
       }); // end on row
       resultSet.on( 'end', function() {
         done();
         console.log( allListItems );
         res.send( allListItems );
       }); // end on end
     } // end on error
   }); // end on pool.connect
 }); //end app.get

 app.post( '/addList', function ( req, res ) {
  pool.connect( function( err, connection, done ){
    if ( err ){
      console.log( err );
      res.sendStatus( 400 );
    }
    else{
      console.log('connected  to db', req.body);
      connection.query("INSERT INTO tasks (task, status) VALUES ($1, $2)", [req.body.task, req.body.status]);
      done();
      res.send(listToSend);
      // res.send(200);
    } // end no error
  }); // end pool.connect
}); // end addList POST
