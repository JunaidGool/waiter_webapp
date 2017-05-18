const express = require("express");
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//setup express app
const app = express ();

//connect to mongoDB
mongoose.connect('mongodb://localhost/logindb');
mongoose.Promise = global.Promise

app.use(bodyParser.json());

//initialise routes
app.use(routes);

//middleware error handling
app.use(function(err, req, res,next){
  res.send({error: err.message})
});




//listen to port
var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log('LISTENING ON PORT ' + port);

});
