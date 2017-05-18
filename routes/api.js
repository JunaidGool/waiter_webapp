const express = require("express");
const router = express.Router();
const Login = require('../models/login');

// get login details from the DB
router.get('/login', function (req, res){

res.send({type:'GET'});
});

// add a new waiter to the DB
router.post('/login', function (req, res){
Login.create(req.body).then(function(login){
  res.send(login);
  });
});

// update deatils of waiter in DB
router.put('/login/:id', function (req, res){

res.send({type:'PUT'});
});

// delete waiter from the database
router.delete('/login/:id', function (req, res){

res.send({type:'DELETE'});
});

module.exports = router;
