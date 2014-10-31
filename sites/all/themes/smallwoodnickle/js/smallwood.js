(function ($) {
	Drupal.behaviors.smallwood = {
   	attach:function() {

   		/* Toggle the visibility of the staff bios */
			$('.team').click(function() {
				var w = $(this).width(),
				    h = $(this).height(),
				    bio = $('.bio',this),
				    bro = $(this).siblings(),
				    cont = $('.masonry');


				$(this).removeClass('faded').toggleClass('active').siblings().next('.bio.masonry-item').remove();

				if ($('.bio.masonry-item').length == 0) {
					$(bio).clone().toggleClass('masonry-item').css({'left':w+10, 'width':w, 'height':h}).insertAfter(this);
				}
				else {
					$('.bio.masonry-item').remove()
				}
				
				cont.masonry('reload');
			});
		}
	}
}) (jQuery);
