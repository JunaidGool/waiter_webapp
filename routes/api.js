const express = require("express");
const router = express.Router();
const Login = require('../models/login');

// get login details from the DB
router.get('/login', function (req, res){

res.send({type:'GET'});
});

// add a new waiter to the DB
router.post('/login', function (req, res, next){
Login.create(req.body).then(function(login){
  res.send(login);
}).catch(next);
});

// update deatils of waiter in DB
router.put('/login/:id', function (req, res){
  Login.findOne({empID: req.params.id}).then(function(login){
    Login.update({name:login },
      {availabilty:{Monday: true}
    }
    res.send(shift);
  }).catch(next);
});

// delete waiter from the database
router.delete('/login/:id', function (req, res, next){
  Login.findOne({empID: req.params.id}).then (function(login){
    login.remove(), //Remove all the documents that match!
    res.send(login);
  }).catch(next);
});

module.exports = router;
