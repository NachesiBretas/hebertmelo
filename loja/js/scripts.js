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

	$.get("views/home.html",function(data){
			$("#content").html(data).ready(function(){
					generateNavigationLinks();
				});
			$("#content").fadeIn(1000);
	},
	"html");

	generateNavigationLinks();

});

function generateNavigationLinks() {


	$(".ajax-navigation-link").each(function( index ) {
  		var section = $(this).attr("data-section");
  		$( this ).unbind("click");
  		$( this ).click(function() {

  			navigate(section,this);
  		});
	});

	$(".ajax-navigation-external-link").each(function( index ) {
  		var externalSection = $(this).attr("data-section");
  		$( this ).unbind("click");
  		$( this ).click(function() {
  			window.location.href= externalSection;
  		});
	});

}

function navigate(section,obj)
{
	$(".navigate-to-section li").removeClass("active");
	$(obj).addClass("active");

	$.get(section,function(data){

			$("#content").fadeOut(1000,function(){
				
				$("#content").html(data).ready(function(){
					generateNavigationLinks();

                    if(section == "views/carousel.html")
                    {
                            enableJCarousel();
                    }

				});
                window.scrollTo(0, 0);
				$("#content").fadeIn(1000);
			});

	},
	"html");
}

function simpleNavigate(section)
{
    $.get(section,function(data){
        $("#content").html(data).ready(function(){
            generateNavigationLinks();
        });
        window.scrollTo(0, 0);
    },
    "html");
}




function enableJCarousel () {
    // This is the connector function.
    // It connects one item from the navigation carousel to one item from the
    // stage carousel.
    // The default behaviour is, to connect items with the same index from both
    // carousels. This might _not_ work with circular carousels!
    var connector = function(itemNavigation, carouselStage) {
        return carouselStage.jcarousel('items').eq(itemNavigation.index());
    };

    $(function() {
        // Setup the carousels. Adjust the options for both carousels here.
        var carouselStage      = $('.carousel-stage').jcarousel({wrap: 'circular'}).jcarouselAutoscroll({
            interval: 3000,
            target: '+=1',
            autostart: true
        });
        var carouselNavigation = $('.carousel-navigation').jcarousel({wrap: 'circular'}).jcarouselAutoscroll({
            interval: 3000,
            target: '+=1',
            autostart: true
        });

        // We loop through the items of the navigation carousel and set it up
        // as a control for an item from the stage carousel.
        carouselNavigation.jcarousel('items').each(function() {
            var item = $(this);

            // This is where we actually connect to items.
            var target = connector(item, carouselStage);

            item
                .on('jcarouselcontrol:active', function() {
                    carouselNavigation.jcarousel('scrollIntoView', this);
                    item.addClass('active');
                })
                .on('jcarouselcontrol:inactive', function() {
                    item.removeClass('active');
                })
                .jcarouselControl({
                    target: target,
                    carousel: carouselStage
                });
        });

        // Setup controls for the stage carousel
        $('.prev-stage')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.next-stage')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        // Setup controls for the navigation carousel
        $('.prev-navigation')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.next-navigation')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });
    });
}


$(function(){
// part 1
        $('menu a').click(function(){
            location.hash=$(this).attr('href').match(/(^.*)\./)[1]
            return false
        })
// part 2
        var originalTitle=document.title
        function hashChange(){
            var page=location.hash.slice(1)
            if (page!=""){
                $('#content').load(page+".html #sub-content")
                document.title=originalTitle+' – '+page
            }
        }
// part 3
        if ("onhashchange" in window){ // cool browser
            $(window).on('hashchange',hashChange).trigger('hashchange')
        }else{ // lame browser
            var lastHash=''
            setInterval(function(){
                if (lastHash!=location.hash)
                    hashChange()
                lastHash=location.hash
            },100)
        }
    })
   

