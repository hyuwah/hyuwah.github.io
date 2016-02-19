/*!
 * Main Javascript / jQuery file
 * http://hyuwah.github.io/
 */

// TODO:20 optimisasi skrip transisi page
// FIXME: Waktu load pertama atau random, skrip materializenya ga aktif, kalo reload baru bisa
//
//
 // Contents of functions.js
 $(function(){
 'use strict';
 var $page = $('#main'),
    options = {
      debug: true,
      prefetch: true,
      cacheLength: 2,
      onStart: {
        duration: 1500, // Duration of our animation
        render: function ($container) {
          // Add your CSS animation reversing class
          $container.addClass('is-exiting');
          // Restart your animation
          smoothState.restartCSSAnimations();
        }
      },
      onReady: {
        duration: 0,
        render: function ($container, $newContent) {
          // Remove your CSS animation reversing class
          $container.removeClass('is-exiting');
          // Inject the new content
          $container.html($newContent);
          // Materialize jquery initialization
          paket();

        }
      }
    },
    smoothState = $page.smoothState(options).data('smoothState');
    });

  $(document).ready(function() {
    paket();
 });

var paket = function(){
  $(".button-collapse").sideNav({
      edge: 'right', // Choose the horizontal origin
    });
  $('.parallax').parallax();
  $('.scrollspy').scrollSpy();
  $('#sticky').pushpin({ top:0 });
  $('.carousel').carousel();
  $('.collapsible').collapsible({accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });
  $('.slider').slider({full_width: false});

  // Go Up smoothscroll
  $('#goup').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
   });

   // Raised navbar
  $(window).scroll(function() {
    var y = $(window).scrollTop();
    if (y > 0) {
      $("#navbar").removeClass('z-depth-0').addClass('z-depth-1');
    } else if (y==0) {
      $("#navbar").removeClass('z-depth-1').addClass('z-depth-0');
    } else {
      $("#navbar").removeClass('z-depth-0').addClass('z-depth-1');
    }
  });
};
