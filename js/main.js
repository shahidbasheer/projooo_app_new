jQuery(document).ready(function($) {

	$('.fake-uploader').on('click', function(event) {
		event.preventDefault();
		 $('#editor-file').click();
	});

	$('#editor-file').on('change', function () {
		var filename = $('#editor-file').val().split('\\').pop() || 'No file selected.';
	    console.log(filename );
	    $('.file-name').text(filename);
	});



	$('.form-show').on('click',  function(event) {

		console.log('clicked');
		$('.contact-form').show('fast');
		$(this).hide('fast');
	
		
	});
	$('.contact-form .close').on('click',  function(event) {

		console.log('clicked');
		$('.contact-form').hide('fast');
		$('.form-show').show('fast');
		
	
		
	});
	

	errortest ();
	function errortest () {
		$('.logign-form-wraper .error-notify , .signup-form-wraper .error-notify ').css({
					display: 'block',
					property2: 'value2'
				}).addClass('animated bounce');
	}
	
	<!-- Menu Toggle Script -->
	
	$("#menu-toggle").click(function(e) {
	    e.preventDefault();
	    $("#wrapper").toggleClass("toggled");
	});
	



	$("#txtEditor").Editor();


	//dropzon 
	var myDropzone = new Dropzone("div#dropzone", { url: "file-upload"});
	
});//on laod


  

