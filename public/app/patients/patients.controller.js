'use strict';

angular.module('myApp')
.controller('PatientCtrl', function($scope, $http, $filter, $state) {
	$http.get("/api/patients")
	.success(function(response){
		console.log("Patients loaded successfully");
		
		//Building data-content for the popover
		for(var i = 0; i<response.length; i++){
			var pID = response[i]._id;
			var records = response[i].formrecords;
			var recordStr = "";
			for(var j = 0; j<records.length; j++){
				var fID = records[j]._id;
				var date = $filter('date')(records[j].date, 'yyyy-MM-dd HH:mm');
				recordStr += "<a class='ng-binding' ng-click='formrecord("+fID+"," +pID+") href='/formrecords/"+fID+"/"+pID+"'>"+date+"</a>" + "<br/>";

			}
			if(recordStr == "")
				recordStr = "<i>< inga formulär har fyllts i ></>"
			response[i].displayRecords = recordStr;
		}
		$scope.patientRecords = response;
	})
	.error(function(data, status, header, config){
		console.log("Error loading patients");
	});
	
	$scope.addOperation = function(patient_id) {
		$state.go('addoperation', {patient_id: patient_id});
	}
	
	$scope.formrecord = function(formrecord_id, patient_id) {
		$state.go('formrecord', {formrecord_id: formrecord_id, patient_id: patient_id});
	}
	
	$scope.viewPatient = function(patient_id) {
		$state.go('patient', {patient_id: patient_id});
	}
})
.directive('popover', function(){
	return function($scope, $element, $attrs){
		var popoverCandidate = $($element[0]).find("button").popover({html:true});
	}
});