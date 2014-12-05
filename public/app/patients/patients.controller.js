'use strict';

angular.module('myApp')
.controller('PatientCtrl', function($scope, $http, $filter, $state) {
	$http.get("/api/patients")
	.success(function(response){
		console.log("Patients loaded successfully");
		
		// Adding status to each patient
		for (var i = 0; i < response.length; i++) {
			// Get the last form the patient filled in:
			var lastForm = response[i].formrecords[response[i].formrecords.length-1];
			var status; 
			// TODO: this is just dummy logic for determining a patients status
			if (lastForm === undefined) {
				status = "0"; // no status	
			} else if (lastForm.pain > 80) {
				status = "3"; // red
			} else if (lastForm.pain > 50) {
				status = "2"; // yellow
			} else {
				status = "1"; // green
			}
			
			response[i].status = status;
		}
		$scope.patients = response;
		
		
		//Building data-content for the popover
		for(var i = 0; i < response.length; i++) {
			var pID = response[i]._id;
			var records = response[i].formrecords;
			var recordStr = "";
			for(var j = 0; j<records.length; j++){
				var fID = records[j]._id;
				var date = $filter('date')(records[j].date, 'yyyy-MM-dd HH:mm');
				recordStr += date+"<br/>";
			}
			if(recordStr == "")
				recordStr = "<i>< inga formulär har fyllts i ></>"
			response[i].displayRecords = recordStr;
		}
		$scope.patientRecords = response;
		//console.log($scope.patientRecords);
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
	
	// Returns a color code depending on the patients status
	$scope.getStatusColor = function(patient_id) {
		var patient = $scope.getPatient(patient_id);

		if (patient.status === undefined || patient.status === "0") {
			return "white";	
		} else if (patient.status === "3") {
			return "#ec5d57"; // red
		} else if (patient.status === "2") {
			return "#f5d329"; // yellow 
		} else if (patient.status === "1") {
			return "#70bf40"; // green
		}
	}
	
	$scope.getStatusText = function(patient_id) {
		var patient = $scope.getPatient(patient_id);

		//TODO: hardcoded strings
		if (patient.status === undefined || patient.status === "0") {
			return "Inga formulär ifyllda";	
		} else if (patient.status === "3") {
			return "Dålig trend"; // red
		} else if (patient.status === "2") {
			return "Varning"; // yellow
		} else if (patient.status === "1") {
			return "Bra trend"; // green
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


$(function () { $("[data-toggle='tooltip']").tooltip(); });