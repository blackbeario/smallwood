(function ($) {
	Drupal.behaviors.smallwood = {
   	attach:function() {

   		/**
      * Toggle the visibility of the staff bios.
      */
			$('.team').click(function() {
				var w = $(this).width(),
				    h = $(this).height(),
				    bio = $('.bio',this),
				    bro = $(this).siblings(),
				    cont = $('.masonry');
        
        // Remove all appended bios from sibling masonry elements.
				$(this).siblings().next('.bio.masonry-item').remove();

        // Clone the staff bio and insert after clicked staff with masonry class.
				if ($('.bio.masonry-item').length == 0) {
					$(bio).clone().toggleClass('masonry-item').css({'left':w+10, 'width':w, 'height':h}).insertAfter(this);
				}
        // Remove bio on second click if already inserted.
				else {
					$('.bio.masonry-item').remove()
				}
				// Reinit the masonry function to re-order the items.
				cont.masonry('reload');
			});
		}
	}
})(jQuery);
