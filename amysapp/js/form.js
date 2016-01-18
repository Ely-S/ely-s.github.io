jQuery(function($){
	var form = $("#userForm"),
		submit = $("#submit");

	// log ajax requests;
	$(document).ajaxSend(console.log.bind(console));

	form.on("change", function(){
		if (this.checkValidity()) {
			submit.val("I understand and wish to continue with enrollment");
			submit.removeClass("disabled");
		} else {
			submit.val("Complete the form to continue enrollment");
			submit.addClass("disabled");
		}
	}).on("submit", function(e){
		var data = {};
		form.serializeArray().forEach(function(e){
			data[e.name] = e.value;
		}); 
		
		$.post({
			url: "/",
			data: JSON.stringify(data),
			contentType: "application/json"
		});
		
		window.location = "page2.html";
		return false;
	});

});