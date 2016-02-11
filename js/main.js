jQuery(document).ready(function($) {
	
	$('.logign-form-wraper button').click(function(event) {
		console.log('hi');
		event.preventDefault();
		$('.logign-form-wraper .error-notify').css({
			display: 'block',
			property2: 'value2'
		}).addClass('animated bounce');
	});

	//dropzon 
	var myDropzone = new Dropzone("div#dropzone", { url: "file-upload"});
	
	
});//on laod


  

