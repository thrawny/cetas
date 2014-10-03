var mongoose = require('mongoose'), User = mongoose.model('User'), FormRecord = mongoose
		.model('FormRecord');
var promise = new mongoose.Promise;
/*
 * module.exports.list = function(req, res, next){ user_map = function(){
 * emit(this.id, {"patientId" : this.id}) }
 * 
 * Users.mapReduce();
 *  }
 */

module.exports.list = function(req, res, next) {
	console.log("START")
	var _users, _records;
	var list = [];

	User.find({
		role : 0
	}).exec(function(err, users) {
		if (err)
			next(err);
		users.forEach(function(user) {
			FormRecord.find({
				patientId : user._id
			}, function(err, records) {

				var temp = {
					user : user,
					records : records
				};
				//console.log(temp);
				list.push(temp);
				//res.json(temp);
				res.render('mypatients', {list: temp});
			})
		})

		// _users = users;

		// complete();

	});

	// console.log(list);
	// res.json(list);
	// FormRecord.find().exec(function(err, records){
	// if(err) next(err);
	// _records = records;
	// // complete()
	// });

	// function complete(){
	// if(_users !== null && _records !== null){
	// var patients = _users;
	// for(var i in patients){
	// for(var j in _records){
	// patients[i].records = [];
	// if(patients[i].id == _records[j].patientId){
	// patients[i].records.push(_records[j]);
	// }
	// }
	// }
	// res.render('mypatients', {"patients": patients});
	// }
	// else{
	// console.log("SKIP");
	// }
	// }
};