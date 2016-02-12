jQuery(document).ready(function($) {
	
	

	errortest ();
	function errortest () {
		$('.logign-form-wraper .error-notify , .signup-form-wraper .error-notify ').css({
					display: 'block',
					property2: 'value2'
				}).addClass('animated bounce');
	}

	//dropzon 
	var myDropzone = new Dropzone("div#dropzone", { url: "file-upload"});
	
	
});//on laod


  

