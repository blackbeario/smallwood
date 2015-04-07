(function ($) {
  Drupal.behaviors.smallwood = {
    attach:function() {


      /**
      * Navbar toggle overrides.
      **/
      $('.navbar-toggle').click(function(){
        $(this).toggleClass('active');
      });

      $('.nav.sticky li.last a, .navbar-nav li.last a ').click(function(){
        ftrOffset = $('footer .footer .body').offset().top;
        $('html,body').animate({scrollTop:ftrOffset},500);
        return false;
      });


      /**
      * Sticky footer nav front page.
      */
      $('.node-type-news article .field-label, .page-archive article .field-label').html('At A Glance');
      

      /**
      * Responsive slideshow and front banner EFQ img paths.
      **/
      $('.slide').each(function(){
          $(this).attr('style',$(this).attr('style').replace('public:/','/sites/default/files'));
      });


      /**
      * Replace EFQ img paths.
      **/
      $('.bkg').each(function(){
        $(this).attr('src',$(this).attr('src').replace('public:/','/sites/default/files'));
      });


      /**
      * Replace EFQ img paths. Set widths for flexbox elements.
      **/
      function getBannerHt() {
        bannerHt = $('.banner .bkg.img-responsive').height();
        $('.banner nav.nav').css({'margin-top':-bannerHt,'height':bannerHt});

        row = $('.view-projects.residential');
        rowEven = $('.views-row-even', row);
        imgW = $('.img',row).width();
        
        if ($(window).width() >= 768) {
          /* set footer height for flexbox */
          footerHt = $('.footer .bkg.img-responsive').width();
          $('.footer').css({'max-height':footerHt});

          /* Set widths for flexbox elements */
          $('.head, .tease').css({'height':imgW / 2, 'width':imgW / 2});
          $('.tags',rowEven).css({'height':imgW / 2, 'width':imgW / 2, 'margin-left':-imgW / 2});
        }
        else {
          $('.head, .tease').css({'height':'auto','width':'auto'});
          $('.tags',rowEven).css({'height':'auto','width':'auto'});
        }
      }

      $(window).resize(function(){
        getBannerHt();
      });

      $(window).load(function() {
        getBannerHt();
      });

      /**
      * Toggle Commercial categories on Commercial page.
      **/
      var commcat = $("#block-views-projects-block-1 h3");
      commcat.each(function(){
        $(this).nextUntil('h3').andSelf().wrapAll('<div class="comm-row"></div>');
        $(this).click(function(){
          $(this).toggleClass('active').parent().find('.comm-project').toggle();
          $(this).parent().siblings().find('.comm-project').hide();
          $(this).parent().siblings().find(commcat).removeClass('active');
        });
      });


      /**
      * Toggle the visibility of the staff bios.
      */
      $('.page-about .team').click(function(event) {
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

        if ($(this).hasClass('views-row-last')) {
          return false;
        }

        $(this).removeClass('faded').addClass('active');

        // Remove all appended bios from sibling masonry elements.
        bro.addClass('faded').next('.bio.masonry-item').remove();

        // Clone the staff bio and insert after clicked staff with masonry class.
        if (($(window).width() <= 991) && ($(this).hasClass('Staff'))) {
          if (bl === 0) {
            if ($(this).is('.Staff:even') && (!$(this).next().hasClass('views-row-last'))) {
              nextStaff = $(this).next('.Staff');
              bio.clone().toggleClass('masonry-item').addClass('Staff').css({'left':0, 'width':'99%', 'height':h}).insertAfter(nextStaff).find('.guts').wrap("<div class='shell'></div>");
              scroll();
            }
            else if ($(this).next().hasClass('views-row-last')) {
              nextStaff = $(this).next('.Staff');
              bio.clone().toggleClass('masonry-item').addClass('Staff').css({'right':0, 'width':'99%', 'height':h}).insertAfter(nextStaff).find('.guts').wrap("<div class='shell'></div>");
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
            if (($(this).hasClass('Staff')) && (!$(this).next().hasClass('views-row-last'))) {
              bio.clone().toggleClass('masonry-item').addClass('Staff').css({'left':w+10, 'width':w*2+10, 'height':h}).insertAfter(this).find('.guts').wrap("<div class='shell'></div>");
              scroll();
            }
            else if (($(this).hasClass('Staff')) && ($(this).next().hasClass('views-row-last'))) {
              nextStaff = $(this).next('.Staff');
              bio.clone().toggleClass('masonry-item').addClass('Staff').css({'right':0, 'width':w, 'height':h}).insertAfter(this).find('.guts').wrap("<div class='shell'></div>");
              $('.views-row-last').toggle();
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
            if (!$('.views-row-last').is(':visible')) {
              $('.views-row-last').toggle();
            }
          }
          // Reinit the masonry function to re-order the items.
          cont.masonry('reload');
        }

        $('.close').click(function(){
          $('.bio.masonry-item').remove();
          bro.removeClass('faded');
          $('.team').removeClass('active');
          if (!$('.views-row-last').is(':visible')) {
            $('.views-row-last').toggle();
          }
          cont.masonry('reload');
        });

      }); // end team function




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
            navHeight = $(window).height();
          }
          $(window).resize(function(){
            stickyMenu();
          });
          $(window).scroll(function() {
            stickyMenu();
              if ($(window).width() > 768) {
              // If front page.
              if ($(window).scrollTop() > navHeight) {
                nav.addClass('fixed');
                $('.front .banner').css({'margin-top':navHt+40});
              }
              else {
                nav.removeClass('fixed');
                $('.front .banner').css({'margin-top':'3em'});
              }
            }
          });
        });
      } // end sticky footer

    }
  }
})(jQuery);
