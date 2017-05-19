const express = require("express");
const router = express.Router();
const Employee = require('../models/login');
const bodyParser = require('body-parser');

// get create new employee form
router.get('/create-new-account', function (req, res, next){

res.render('create-new-account')
});


// post create new employee form
router.post('/create-new-account', function (req, res, next){
  var inputEmpId = req.body.empId;
  var inputEmpName = req.body.empName ;
  var inputEmpPosition = req.body.empPosition;

  if (inputEmpId != "" && inputEmpName != ""  && inputEmpPosition != ""){
    Employee.create({empID: inputEmpId, name:inputEmpName, position:inputEmpPosition}).then(function(employee){
    req.flash('error', 'New Employee Has Succesfully Been Added');
    res.redirect('/create-new-account');
    }).catch(next);
  } else {
    req.flash('error', 'Please Enter all Required Fields');
    res.redirect('/create-new-account');
  }
});

// get delete employee account
router.get('/delete-account', function (req, res, next){

res.render('delete-account')
});

// delete employee account
router.delete('/delete-account/:id', function (req, res, next){
  Employee.findOne({empID: req.params.id}).then (function(employee){
    login.remove(), //Remove all the documents that match!
    res.send(employee);
  }).catch(next);
});












// get login details from the DB
router.get('/login', function (req, res){

res.render('login')
});

// add a new waiter to the DB
router.post('/login', function (req, res, next){
Employee.create(req.body).then(function(employee){
  res.send(employee);
}).catch(next);
});

// update deatils of waiter in DB
router.put('/login/:id', function (req, res,next){
  Employee.findOne({empID: Number(req.params.id)}).then(function(employee){
    employee.availability.Monday = true;
    employee
      .save()
      .then(function(results){
        res.send(results);
      });

  }).catch(next);
});

// delete waiter from the database
router.delete('/login/:id', function (req, res, next){
  Employee.findOne({empID: req.params.id}).then (function(employee){
    login.remove(), //Remove all the documents that match!
    res.send(employee);
  }).catch(next);
});

module.exports = router;
