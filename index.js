const express = require("express");
const exphbs  = require('express-handlebars');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const mongoose = require('mongoose');

//setup express app
const app = express ();

//connect to mongoDB
mongoose.connect('mongodb://localhost/employeedb');
mongoose.Promise = global.Promise

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// override with POST having ?_method=PUT and DELETE
app.use(methodOverride('_method'))


app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }}));

app.use(flash());

//initialise routes
app.use(routes);

//middleware error handling
app.use(function(err, req, res, next){
  res.send({error: err.message})
});

// set the view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//listen to port
var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log('LISTENING ON PORT ' + port);

});
