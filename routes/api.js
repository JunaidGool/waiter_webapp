const express = require("express");
const router = express.Router();
const Employee = require('../models/login');
const bodyParser = require('body-parser');

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

// get employee details
router.get('/view-employees', function (req, res, next){

res.render('view-employees')
});










// delete employee account
// router.delete('/delete-account/:empId', function (req, res, next){
//   var paramId = req.params.empId;
//
//     Employee.findOne({empID:req.params.empId}).then (function(employee){
//       employee.remove(), //Remove all the documents that match!
//       res.send(employee);
//       console.log(employee)
//       req.flash('error', 'Employee Has Succesfully Been Deleted');
//       res.redirect('/delete-account/:empId');
//     }).catch(next);
// });



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
   Employee.findOne({empID: req.params.id}).then (function(login){
     login.remove(), //Remove all the documents that match!
     res.send(login);
   }).catch(next);
  });

module.exports = router;
