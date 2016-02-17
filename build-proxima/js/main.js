jQuery(document).ready(function($) {

	// file uploader
	$('.fake-uploader').on('click', function(event) {
		event.preventDefault();
		 $('#editor-file').click();
	});

	$('#editor-file').on('change', function () {
		var filename = $('#editor-file').val().split('\\').pop() || 'No file selected.';
	    console.log(filename );
	    $('.file-name').text(filename);
	});


	// contact form show hide
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
	
	// form error demo
	errortest ();
	function errortest () {
		$('.logign-form-wraper .error-notify , .signup-form-wraper .error-notify ').css({
					display: 'block',
					property2: 'value2'
				}).addClass('animated bounce');
	}
	
	
	
		// resize dropfile div
		//wait for editor js to adjust
		setTimeout(function(){ resizeDropfile(); }, 200);

		$( window ).resize(function() {
		 	resizeDropfile();
		 	resizeSidebar ();
		});

		function resizeDropfile () {
			var heigh = $(".thread-content .left").height();
			console.log(heigh);
				      $(".thread-editor .dropzone").css("height",heigh-28);
		}
		resizeSidebar ();
		function resizeSidebar () {
			var heigh = $(".sidebar-page .col-sm-12").height();
			console.log(heigh);
				      $(".sidebar-page #sidebar-wrapper").css("height",heigh);
		}


	$("#txtEditor").Editor();

	// remove member
	$(".remove .bubble i").on('click', function(event) {
		$(this).parent().fadeOut()
	});

	//dropzon 
	var myDropzone = new Dropzone("div#dropzone", { url: "file-upload"});
	
});//on laod


  

