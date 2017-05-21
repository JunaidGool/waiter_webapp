const express = require("express");
const router = express.Router();
const Employee = require('../models/login');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get('/', function (req, res, next){
res.redirect('home');
});

router.get('/home', function (req,res,next){
res.render('home');
});

// get create new employee form
router.get('/create-new-account', function (req, res, next){
res.render('create-new-account');
});

// post create new employee form
router.post('/create-new-account', urlencodedParser, function (req, res, next){
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

// get employee details
router.get('/view-employees', function (req, res, next){
  Employee.find({}).then(function(employee){

  res.render('view-employees', {employee});
  }).catch(next);

});

// get login details from the DB
router.get('/login', function (req, res){

res.render('login');
});

router.get('/waiter/:id', function (req, res, next){
  Employee.findOne({empID: req.params.id }).then(function(employee){

  res.render('waiter', {output: req.params.id, employee});
  });
});

router.post('/waiter/submit',urlencodedParser, function (req, res, next){
  var id = req.body.id;

  res.redirect('/waiter/' + id);
});










// update deatils of waiter in DB
// router.put('/waiter/:usename', function (req, res,next){
//   Employee.findOne({empID: Number(req.params.id)}).then(function(employee){
//     employee.availability.Monday = true;
//     employee
//       .save()
//       .then(function(results){
//         res.send(results);
//       });
//
//   }).catch(next);
// });
//
// // delete waiter from the database
// router.delete('/login/:id', function (req, res, next){
//    Employee.findOne({empID: req.params.id}).then (function(login){
//      login.remove(), //Remove all the documents that match!
//      res.send(login);
//    }).catch(next);
//   });

module.exports = router;
