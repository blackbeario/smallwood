(function ($) {
   Drupal.behaviors.smallwood = {
      attach:function() {

        /**
        * Toggle the visibility of the staff bios.
        */
        $('.team').click(function() {
          w = $(this).width(),
          h = $(this).height(),
          bio = $('.bio',this),
          bro = $(this).siblings(),
          cont = $('.masonry');
          $(this).removeClass('faded');
                    
        // Remove all appended bios from sibling masonry elements.
        bro.addClass('faded').next('.bio.masonry-item').remove();

        // Clone the staff bio and insert after clicked staff with masonry class.
        if ($('.bio.masonry-item').length === 0) {
          bio.clone().toggleClass('masonry-item').css({'left':w+10, 'width':w, 'height':h}).insertAfter(this).find('.guts').wrap("<div class='shell'></div>");
        }
        // Remove bio on second click if already inserted.
        else {
          $('.bio.masonry-item').remove();
          bro.removeClass('faded');
        }
        // Reinit the masonry function to re-order the items.
        cont.masonry('reload');
      });

      /**
      * Footer nav
      */
      $(window).load(function() {
        function stickyMenu(){
          main = $('.main-container'),
          nav = $('nav.sticky'),
          navOffset = nav.offset().top,
          navHt = nav.height();
          navHeight = $(window).height() - navHt;
        }
        $(window).resize(function(){
          stickyMenu();
        });
        $(window).scroll(function() {
          stickyMenu();
          // If front page.
          if($('.front').length){
            if ($(window).scrollTop() > navHeight) {
              nav.addClass('fixed');
              main.css('margin-top',navHt+30);
            }
            else {
              nav.removeClass('fixed');
              main.css('margin-top',0);
            }
          }
        });
      });

    }
  }
})(jQuery);
