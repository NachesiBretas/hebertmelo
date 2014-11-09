// global. currently active menu item 
var current_item = 0;

// few settings
var section_hide_time = 1300;
var section_show_time = 1300;

// jQuery stuff
jQuery(document).ready(function($) {

	// Switch section
	$("a", '.mainmenu').click(function() 
	{
		if( ! $(this).hasClass('active') ) { 
			current_item = this;
			// close all visible divs with the class of .section
			$('.section:visible').fadeOut( section_hide_time, function() { 
				$('a', '.mainmenu').removeClass( 'active' );  
				$(current_item).addClass( 'active' );
				var new_section = $( $(current_item).attr('href') );
				new_section.fadeIn( section_show_time );
			} );
		}
		return false;
	});		
});




$(document).ready(function() {

	$(".navigate-to-section li").each(function( index ) {
  		var section = $(this).attr("data-section");
  		$( this ).click(function() {

  			navigate(section,this);
  		});
	});

	$.get("views/home.html",function(data){
			$("#content").html(data);
			$("#content").fadeIn(1000);
	},
	"html");
});


function navigate(section,obj)
{
	$(".navigate-to-section li").removeClass("active");
	$(obj).addClass("active");

	$.get("views/"+section+".html",function(data){
			$("#content").fadeOut(1000,function(){
				$("#content").html(data);
				$("#content").fadeIn(1000);
			});

	},
	"html");
}