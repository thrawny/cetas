// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var FormRecordSchema = new Schema({
  patientId: Number,
  question1: Number,
  question2: Number
});

FormRecordSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('FormRecord', FormRecordSchema);