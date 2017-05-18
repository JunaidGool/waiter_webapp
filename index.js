const express = require("express");

//setup express app
const app = express ();








//listen to port
var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log('LISTENING ON PORT ' + port);

});
