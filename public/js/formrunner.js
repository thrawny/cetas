(function(){
	$(document).ready(function(){
		
		//Sets correct submit-url to submit form if form is filled out by doctor
		var url = window.location.href;
		//remove the site-adress from url and work only with the path-part (as array splited on "/")
		var rest = url.replace(new RegExp("http://[^/]*."), "").split("/");
		console.log(rest);
		if(rest[0] === "mypatients"){
			$("#patientform").attr("action", "/api/patients/"+rest[1]+"/formrecords");
		}
	});
})();