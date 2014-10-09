// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
//TODO: patientId = number
var FormRecordSchema = new Schema({
  pain: Number,
  painKillers: String,
  nausea: Number,
  narcosis: Number,
  dailyActivities: Number,
  routine: Number,
  satisfied: Number,
  worstThing: String,
  assess: Number,
  comments: String,
  date: { type: Date, default: Date.now, required: true },
});

module.exports.FormRecordSchema = FormRecordSchema;

mongoose.model('FormRecord', FormRecordSchema);
