var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    FormRecord = mongoose.model('FormRecord');

/*   
module.exports.list = function(req, res, next){
    user_map = function(){
        emit(this.id, {"patientId" : this.id})
    }

    Users.mapReduce();
    
}*/
    

module.exports.list = function(req, res, next){
    console.log("START")
    var _users, _records;

    User.find().exec(function(err, users){
        if(err) next(err);
        _users = users;
        complete();
    });
    FormRecord.find().exec(function(err, records){
        if(err) next(err);
        _records = records;
        complete()
    });
    
    function complete(){
        if(_users !== null && _records !== null){
            var patients = _users;
            for(var i in patients){
                for(var j in _records){
                    patients[i].records = [];
                    if(patients[i].id == _records[j].patientId){
                        patients[i].records.push(_records[j]);
                    }
                }
            }
            res.render('mypatients', {"patients": patients});
        }
        else{
            console.log("SKIP");
        }
    }
};