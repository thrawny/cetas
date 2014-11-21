'use strict';

angular.module('myApp')
.controller('PatientCtrl', function($scope, $http) {
	$http.get("/api/patients")
	.success(function(response){
		console.log("Patients loaded successfully");
		console.log(response);
		
		for(var i = 0; i<response.length; i++){
			console.log(response[i]);
			var records = response[i].formrecords;
			var recordStr = "";
			for(var j = 0; j<records.length; j++){
				console.log(records[i]);
				recordStr += "<a href='/'>"+records[j].date+"</a>" + "<br/>";
			}
			if(recordStr == "")
				recordStr = "<i>< inga formulär har fyllts i ></>"
			response[i].displayRecords = recordStr;
			console.log(recordStr);
		}
		
		$scope.patientRecords = response;
	})
	.error(function(data, status, header, config){
		console.log("Error loading patients");
	});
})
.directive('popover', function(){
	return function($scope, $element, $attrs){
		var popoverCandidate = $($element[0]).find("button").popover({html:true});
		
	}	
});

