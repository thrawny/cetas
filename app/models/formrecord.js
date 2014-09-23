// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var FormRecordSchema = new Schema({
  patientId: String,
  pain: String,
  painKillers: String,
  nausea: String,
  narcosis: String
});

FormRecordSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('FormRecord', FormRecordSchema);