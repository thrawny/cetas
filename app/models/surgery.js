var mongoose = require('mongoose');

var surgerySchema = mongoose.Schema({
    operation: String,
    department: String,
    hospital: String,
    comments: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Surgery', surgerySchema);