// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var formrecordSchema = require('./formrecord').formrecordSchema;

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    },
    firstname: String,
    lastname: String,
    personal_number: String,
    address1: String,
    address2: String,
    postalno: Number,
    city: String,
    mobile: String,
    role: { type: Number, min: 0, max: 2 },
    formrecords: [formrecordSchema]
});

var surgeryInfoSchema = mongoose.Schema({

    surgery: String,
    compartment: String,
    hospital: String,
    notes: String,
    date: { type: Date, default: Date.now }
});


// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
