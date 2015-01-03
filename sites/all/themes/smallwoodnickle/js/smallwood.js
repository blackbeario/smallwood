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
          bio.clone().toggleClass('masonry-item').css({'left':w+10, 'width':w, 'height':h}).insertAfter(this);
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
        function slideHt(){
          slides = $('#block-views-projects-block').height();
          nav = $('#block-menu-menu-footer-nav');
          main = $('.main-container');
          navHt = nav.height();
          //console.log(offset, slides);
        }
        $(window).resize(function(){
          slideHt();
        });
        $(window).scroll(function() {
          slideHt();
          //console.log(offset, slides);
          if ($(window).scrollTop() >= slides) {
            nav.addClass('fixed');
            main.css('margin-top',navHt+30);
          }
          else {
            nav.removeClass('fixed');
            main.css('margin-top',0);
          }
        });
      });

    }
  }
})(jQuery);
