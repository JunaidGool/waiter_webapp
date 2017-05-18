const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

// create login Schema & model
const LoginSchema = new Schema ({
  empID:{type: Number, required: [true, 'Login Field is Required']},
  name: {type: String, required: [true, 'Name Field is Required']},
  position: {type: String, required: [true, 'Position Field is Required']},
  availability: {
    Monday: {type: Boolean, default:false},
    Tuesday: {type: Boolean, default:false},
    Wednesday: {type: Boolean, default:false},
    Thursday: {type: Boolean, default:false},
    Friday: {type: Boolean, default:false},
    Saturday:{type: Boolean, default:false},
    Sunday: {type: Boolean, default:false}
  }
});

const Login = mongoose.model('login', LoginSchema);

module.exports = Login;
