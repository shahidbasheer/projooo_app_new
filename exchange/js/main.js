jQuery(document).ready(function($) {
	$(".due-del-step-2 ul.tabs").width($("ul.frames a").outerWidth()-1);	
	
	$(window).resize(function() {
	console.log('resized');
		$(".due-del-step-2 ul.tabs").width($("ul.frames a").outerWidth()-1);
           
        });
	
	//right side bar 

	/* $('.close').on('click', function(event) {
	 	event.preventDefault();
	 	$('.loan-application').toggleClass('loan-application-show');
	 });

	 $('.app, .bid').on('click', function  () {
        console.log('service clicked');
        $('.loan-application').toggleClass('loan-application-show');
        
    });*/

		// resize dropfile div
		//wait for editor js to adjust
		setTimeout(function(){ resizeSidebar(); }, 200);

		$( window ).resize(function() {
		 	
		 	resizeSidebar ();
		});

		
		resizeSidebar ();
		function resizeSidebar () {
			var heigh = $(".review-portal__inner .content").height();
			console.log(heigh);
				      $(".review-portal__inner .sidebar").css("height",heigh);
		}
	
});