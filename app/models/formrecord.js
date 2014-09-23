// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
//TODO: patientId = number
var FormRecordSchema = new Schema({
  patientId: String,
  pain: Number,
  painKillers: String,
  nausea: Number,
  narcosis: Number,
  dailyActivities: Number,
  routine: Number,
  satisfied: Number,
  worstThing: String,
  assess: Number
});

FormRecordSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('FormRecord', FormRecordSchema);
