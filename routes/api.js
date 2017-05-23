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

router.post('/waiter/:id/select', function (req, res, next){
  var availability = req.body.selectDay;
  var employee = req.employees;
  var sunMessg = "Not Available";
  var monMessg = "Not Available";
  var tueMessg = "Not Available";
  var wedMessg = "Not Available";
  var thurMessg = "Not Available";
  var friMessg = "Not Available";
  var satMessg = "Not Available";



  console.log(availability);
  for (i=0; i<availability.length; i++){
    if (availability[i] === 'Sunday'){
      employee.availability.Sunday = true;
      sunMessg = "Available";
    }
    if (availability[i] === "Monday"){
      employee.availability.Monday = true;
      monMessg = "Available";
    }
     if (availability[i] === "Tuesday"){
      employee.availability.Tuesday = true;
      tueMessg = "Available";
    }
     if (availability[i] === "Wednesday"){
      employee.availability.Wednesday = true;
      wedMessg = "Available";
    }
     if (availability[i] === "Thursday"){
      employee.availability.Thursday = true;
      thurMessg = "Available";
    }
     if (availability[i] === "Friday"){
      employee.availability.Friday = true;
      friMessg = "Available";
    }
     if (availability[i] === "Saturday"){
      employee.availability.Saturday = true;
      satMessg = "Available";
    }
  };


employee.save();
res.render('selectedDays', {output:req.employees, sunMessg, monMessg, tueMessg, wedMessg, thurMessg, friMessg, satMessg});
});




router.param('id', function (req, res, next, id){
  Employee.findOne({empID: id}).then(function(employee){
  {
    req.employees = employee;
    next();
  }
}).catch(next)
});



router.get('/waiter/:id', function (req, res, next){

res.render('waiter', {output:req.employees});
});

router.post('/waiter/submit',urlencodedParser, function (req, res, next){
  var id = req.body.id;
  if (id.startsWith(10)){
  res.redirect('/waiter/' + id);
  }
  else if (id.startsWith(90)){
  res.redirect('/admin')
  }
});

router.get('/admin', function (req, res, next){

  res.render('admin')
})







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
