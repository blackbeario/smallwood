(function ($) {
   Drupal.behaviors.smallwood = {
      attach:function() {

        /**
        * Navbar toggle overrides.
        **/
        $('.navbar-toggle').click(function(){
          $(this).toggleClass('active');
        });
        
        /*
        function isRetina() {
          var query = '(-webkit-min-device-pixel-ratio: 1.5),\
          (min--moz-device-pixel-ratio: 1.5),\
          (-o-min-device-pixel-ratio: 3/2),\
          (min-device-pixel-ratio: 1.5),\
          (min-resolution: 144dpi),\
          (min-resolution: 1.5dppx)';

          if (window.devicePixelRatio > 1 || (window.matchMedia && window.matchMedia(query).matches)) {
          return true;
          }
          return false;
        } */

        /**
        * Responsive slideshow and front banner EFQ img paths.
        **/
        $('.slide').each(function(){
          /* Mobile */
          if ($(window).width() <= 480 ) {
            /* Check for retina devices. */
            if (window.devicePixelRatio > 1) {
              $(this).attr('style',$(this).attr('style').replace('public:/','sites/default/files/styles/slide_768/public'));
            }
            else {
              $(this).attr('style',$(this).attr('style').replace('public:/','sites/default/files/styles/slide_480/public'));
            }
          }
          /* Tablet */
          if ((($(window).width() <= 768) && ($(window).width() > 480))) {
            /* Check for retina devices. */
            if (window.devicePixelRatio > 1) {
              $(this).attr('style',$(this).attr('style').replace('public:/','sites/default/files'));
            }
            else {
              $(this).attr('style',$(this).attr('style').replace('public:/','sites/default/files/styles/slide_768/public'));
            }
          }
          /* Desktop */
          if ($(window).width() > 768) {
            $(this).attr('style',$(this).attr('style').replace('public:/','sites/default/files'));
          }
        });

        $('.bkg').each(function(){
          $(this).attr('src',$(this).attr('src').replace('public:/','/sites/default/files'));
        });

        function getBannerHt() {
          bannerHt = $('.banner .bkg.img-responsive').height();
          $('.banner nav.nav').css({'margin-top':-bannerHt,'height':bannerHt});
          
          if ($(window).width() >= 768) {
            footerHt = $('.footer .bkg.img-responsive').width();
            $('.footer').css({'max-height':footerHt});
          }
        }

        $(window).resize(function(){
          getBannerHt();
        });

        $(window).load(function() {
          getBannerHt();
        });

        /**
        * Toggle the visibility of the staff bios.
        */
        $('.team').click(function() {
          // Variables
          w = $(this).width(),
          h = $(this).height(),
          n = $('.nav.sticky').height(),
          bl = $('.bio.masonry-item').length,
          bio = $('.bio',this),
          bro = $(this).siblings(),
          cont = $('.masonry'),
          bOffset = $(this).offset().top;

          function scroll() {
            $('html, body').animate({scrollTop:bOffset-n-10},500);
          }

          $(this).removeClass('faded').addClass('active');

          // Remove all appended bios from sibling masonry elements.
          bro.addClass('faded').next('.bio.masonry-item').remove();

          // Clone the staff bio and insert after clicked staff with masonry class.
          if (($(window).width() <= 991) && ($(this).hasClass('Staff'))) {
            if (bl === 0) {
              if ($(this).is('.Staff:even')) {
                nextStaff = $(this).next('.Staff');
                bio.clone().toggleClass('masonry-item').addClass('Staff').css({'left':0, 'width':'99%', 'height':h}).insertAfter(nextStaff).find('.guts').wrap("<div class='shell'></div>");
                scroll();
              }
              else {
                bio.clone().toggleClass('masonry-item').addClass('Staff').css({'left':0, 'width':'99%', 'height':h}).insertAfter(this).find('.guts').wrap("<div class='shell'></div>");
                scroll();
              }
            }
            // Remove bio if already inserted.
            else {
              $('.bio.masonry-item').remove();
              bro.removeClass('faded');
              $('.team').removeClass('active');
            }
            // Reinit the masonry function to re-order the items.
            cont.masonry('reload');
          }
        

          if (($(window).width() > 991) || ($(this).hasClass('Partner'))) {
            if (bl === 0) {
              if ($(this).hasClass('Staff')) {
                bio.clone().toggleClass('masonry-item').addClass('Staff').css({'left':w+10, 'width':w*2+10, 'height':h}).insertAfter(this).find('.guts').wrap("<div class='shell'></div>");
                scroll();
              }
              else {
                bio.clone().toggleClass('masonry-item').addClass('Partner').css({'left':w+10, 'width':w-8, 'height':h}).insertAfter(this).find('.guts').wrap("<div class='shell'></div>");
                scroll();
              }         
            }
            // Remove bio on second click if already inserted.
            else {
              $('.bio.masonry-item').remove();
              bro.removeClass('faded');
              $('.team').removeClass('active');
            }
            // Reinit the masonry function to re-order the items.
            cont.masonry('reload');
          }
          $('.close').click(function(){
            $('.bio.masonry-item').remove();
            bro.removeClass('faded');
            $('.team').removeClass('active');
            cont.masonry('reload');
          });
        });


      /**
      * Sticky footer nav front page.
      */
      if($('.front').length){
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
            if ($(window).scrollTop() > navHeight) {
              nav.addClass('fixed');
            }
            else {
              nav.removeClass('fixed');
            }
          });
        });
      }

      /**
      * Acrtext.js for Residential page headers.
      **/
      $('.head .title a').arctext({radius: 125})

    }
  }
})(jQuery);
