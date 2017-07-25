const express = require("express");
const router = express.Router();
const Employee = require('../models/login');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});

router.get('/', function(req, res, next) {
  res.redirect('home');
});

router.get('/home', function(req, res, next) {
  res.render('home');
});

// get create new employee form
router.get('/create-new-account', function(req, res, next) {
  res.render('create-new-account');
});

// post create new employee form
router.post('/create-new-account', urlencodedParser, function(req, res, next) {
  var inputEmpId = req.body.empId;
  var inputEmpName = req.body.empName;
  var inputEmpPosition = req.body.empPosition;

  if (inputEmpId != "" && inputEmpName != "" && inputEmpPosition != "") {
    Employee.create({
      empID: inputEmpId,
      name: inputEmpName,
      position: inputEmpPosition
    }).then(function(employee) {
      req.flash('error', 'New Employee Has Succesfully Been Added');
      res.redirect('/create-new-account');
    }).catch(next);
  } else {
    req.flash('error', 'Please Enter all Required Fields');
    res.redirect('/create-new-account');
  }
});

// get employee details
router.get('/view-employees', function(req, res, next) {
  Employee.find({}).then(function(employee) {
    res.render('view-employees', {
      employee
    });
  }).catch(next);

});

// get login details from the DB
router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/waiter/:id/select', function(req, res, next) {
  var availability = req.body.selectDay;
  var employee = req.employees;
  var sunMessg = "Not Available";
  var monMessg = "Not Available";
  var tueMessg = "Not Available";
  var wedMessg = "Not Available";
  var thurMessg = "Not Available";
  var friMessg = "Not Available";
  var satMessg = "Not Available";

  // re-set availabilty to false for update
  employee.availability.Sunday = false;
  employee.availability.Monday = false;
  employee.availability.Tuesday = false;
  employee.availability.Wednesday = false;
  employee.availability.Thursday = false;
  employee.availability.Friday = false;
  employee.availability.Saturday = false;

  // validate for single check box selections
  if (availability === 'Sunday') {
    employee.availability.Sunday = true;
    sunMessg = "Available";
  } else if (availability === 'Monday') {
    employee.availability.Monday = true;
    monMessg = "Available";
  } else if (availability === 'Tuesday') {
    employee.availability.Tuesday = true;
    tueMessg = "Available";
  } else if (availability === 'Wednesday') {
    employee.availability.Wednesday = true;
    wedMessg = "Available";
  } else if (availability === "Thursday") {
    employee.availability.Thursday = true;
    thurMessg = "Available";
  } else if (availability === 'Friday') {
    employee.availability.Friday = true;
    friMessg = "Available";
  } else if (availability === 'Saturday') {
    employee.availability.Saturday = true;
    satMessg = "Available";
  }

  // validate for multiple check box selections
  for (i = 0; i < availability.length; i++) {
    if (availability[i] === 'Sunday') {
      employee.availability.Sunday = true;
      sunMessg = "Available";
    } else if (availability[i] === "Monday") {
      employee.availability.Monday = true;
      monMessg = "Available";
    } else if (availability[i] === "Tuesday") {
      employee.availability.Tuesday = true;
      tueMessg = "Available";
    } else if (availability[i] === "Wednesday") {
      employee.availability.Wednesday = true;
      wedMessg = "Available";
    } else if (availability[i] === "Thursday") {
      employee.availability.Thursday = true;
      thurMessg = "Available";
    } else if (availability[i] === "Friday") {
      employee.availability.Friday = true;
      friMessg = "Available";
    } else if (availability[i] === "Saturday") {
      employee.availability.Saturday = true;
      satMessg = "Available";
    }
  };

  employee.save();
  res.render('selectedDays', {
    output: req.employees,
    sunMessg,
    monMessg,
    tueMessg,
    wedMessg,
    thurMessg,
    friMessg,
    satMessg
  });
});

router.param('id', function(req, res, next, id) {
  Employee.findOne({
    empID: id
  }).then(function(employee) {
    {
      req.employees = employee;
      next();
    }
  }).catch(next)
});

router.get('/waiter/:id', function(req, res, next) {
  res.render('waiter', {
    output: req.employees
  });
});

router.post('/waiter/submit', urlencodedParser, function(req, res, next) {
  var id = req.body.id;
  if (id.startsWith(10)) {
    res.redirect('/waiter/' + id);
  } else if (id.startsWith(90)) {
    res.redirect('/admin')
  }
});

router.get('/admin', function(req, res, next) {
  res.render('admin')
});

router.get('/days', function(req, res, next) {
  var sundayStaff = [];
  var mondayStaff = [];
  var tuesdayStaff = [];
  var wednesdayStaff = [];
  var thursdayStaff = [];
  var fridayStaff = [];
  var saturdayStaff = [];

  var sundayShiftStatus = "";
  var mondayShiftStatus = "";
  var tuesdayShiftStatus = "";
  var wednesdayShiftStatus = "";
  var thursdayShiftStatus = "";
  var fridayShiftStatus = "";
  var saturdayShiftStatus = "";

  Employee.find({}).then(function(employee) {
    for (i = 0; i < employee.length; i++) {
      if (employee[i].availability.Sunday === true) {
        sundayStaff.push(employee[i].name)
      }
      if (employee[i].availability.Monday === true) {
        mondayStaff.push(employee[i].name)
      }
      if (employee[i].availability.Tuesday === true) {
        tuesdayStaff.push(employee[i].name)
      }
      if (employee[i].availability.Wednesday === true) {
        wednesdayStaff.push(employee[i].name)
      }
      if (employee[i].availability.Thursday === true) {
        thursdayStaff.push(employee[i].name)
      }
      if (employee[i].availability.Friday === true) {
        fridayStaff.push(employee[i].name)
      }
      if (employee[i].availability.Saturday === true) {
        saturdayStaff.push(employee[i].name)
      }
    }

    // sunday status
    if (sundayStaff.length === 3) {
      sundayShiftStatus = "sufficient"
    } else if (sundayStaff.length < 3) {
      sundayShiftStatus = "in-sufficient"
    } else {
      sundayShiftStatus = "overloaded"
    }

    // monday status
    if (mondayStaff.length === 3) {
      mondayShiftStatus = "sufficient"
    } else if (mondayStaff.length < 3) {
      mondayShiftStatus = "in-sufficient"
    } else {
      mondayShiftStatus = "overloaded"
    }

    // tuesday status
    if (tuesdayStaff.length === 3) {
      tuesdayShiftStatus = "sufficient"
    } else if (tuesdayStaff.length < 3) {
      tuesdayShiftStatus = "in-sufficient"
    } else {
      tuesdayShiftStatus = "overloaded"
    }

    // wednesday status
    if (wednesdayStaff.length === 3) {
      wednesdayShiftStatus = "sufficient"
    } else if (wednesdayStaff.length < 3) {
      wednesdayShiftStatus = "in-sufficient"
    } else {
      wednesdayShiftStatus = "overloaded"
    }

    // thursday status
    if (thursdayStaff.length === 3) {
      thursdayShiftStatus = "sufficient"
    } else if (thursdayStaff.length < 3) {
      thursdayShiftStatus = "in-sufficient"
    } else {
      thursdayShiftStatus = "overloaded"
    }

    // friday status
    if (fridayStaff.length === 3) {
      fridayShiftStatus = "sufficient"
    } else if (fridayStaff.length < 3) {
      fridayShiftStatus = "in-sufficient"
    } else {
      fridayShiftStatus = "overloaded"
    }

    // saturday status
    if (saturdayStaff.length === 3) {
      saturdayShiftStatus = "sufficient"
    } else if (saturdayStaff.length < 3) {
      saturdayShiftStatus = "in-sufficient"
    } else {
      saturdayShiftStatus = "overloaded"
    }


    console.log(sundayShiftStatus)
    console.log(mondayShiftStatus)
    console.log(tuesdayShiftStatus)
    console.log(wednesdayShiftStatus)
    console.log(thursdayShiftStatus)
    console.log(fridayShiftStatus)
    console.log(saturdayShiftStatus)


    res.render('days', {
      employee,
      sundayStaff,
      mondayStaff,
      tuesdayStaff,
      wednesdayStaff,
      thursdayStaff,
      fridayStaff,
      saturdayStaff,
      sundayShiftStatus,
      mondayShiftStatus,
      tuesdayShiftStatus,
      wednesdayShiftStatus,
      thursdayShiftStatus,
      fridayShiftStatus,
      saturdayShiftStatus,

    });
  }).catch(next)
});

module.exports = router;
