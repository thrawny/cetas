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
	
	$scope.getStatusColor = function(patient_id) {
		var patient = $scope.getPatient(patient_id);
		var lastForm = patient.formrecords[patient.formrecords.length-1];

		// TODO: this is just dummy logic for determining a patients status
		if (lastForm === undefined) {
			return "white";	
		} else if (lastForm.pain < 20) {
			return "#ec5d57";
		} else if (lastForm.pain < 50) {
			return "#f5d329";
		} else {
			return "#70bf40";
		}
	}
	
	$scope.getPatient = function(patient_id) {
		for (var i = 0; i < $scope.patientRecords.length; i++) {
			if ($scope.patientRecords[i]._id === patient_id) {
				return $scope.patientRecords[i];
			}
		}
		return null;
	}
})
.directive('popover', function(){
	return function($scope, $element, $attrs){
		var popoverCandidate = $($element[0]).find("button").popover({html:true});
	}
});