/*!
 * Main Javascript / jQuery file
 * http://hyuwah.github.io/
 */

// TODO:20 optimisasi skrip transisi page
//

$(document).ready(function () {
  paket();
});

// Contents of functions.js
$(function () {
  // 'use strict';
  // var $body = $('html, body'),
  //   content = $('main').smoothState({
  //     // Runs when a link has been activated

  //     onStart: {
  //       duration: 1000, // Duration of our animation
  //       render: function (url, $container) {
  //         // toggleAnimationClass() is a public method
  //         // for restarting css animations with a class
  //         content.toggleAnimationClass('is-exiting');

  //         // Scroll user to the top, this is very important, transition may not work without this
  //         $body.animate({
  //           scrollTop: 0
  //         });
  //       }
  //     },
  //      onReady: {
  //       duration: 1000, // Duration of our animation
  //       render: function (url, $container) {
  //         // toggleAnimationClass() is a public method
  //         // for restarting css animations with a class
  //         content.toggleAnimationClass('scene_element--fadeindown');

  //         // Scroll user to the top, this is very important, transition may not work without this
  //         $body.animate({
  //           scrollTop: 0
  //         });
  //       }
  //     },
  'use strict';
    var $body = $('html, body'),
    content = $('#bungkus').smoothState({
      debug: true,
      prefetch: true,
      cacheLength: 2,
      onStart: {
        duration: 1000, // Duration of our animation
        render: function ($container) {
          // Add your CSS animation reversing class
          $container.addClass('is-exiting');
          // Restart your animation
          content.restartCSSAnimations();
         
        }
      },

      onReady: {
        duration: 250,
        render: function ($container, $newContent) {
          // Remove your CSS animation reversing class
          
          $container.removeClass('is-exiting');
          // Inject the new content
          $container.html($newContent);

          // Scroll user to the top, this is very important, transition may not work without this
          $body.animate({
            scrollTop: 0
          });
        }
         
      },

      // runs when the new content has been injected into the page and all animations are complete
      onAfter: function ($container, $newContent) {
        paket();
      }
    }).data('smoothState');
});



var paket = function () {
  $(".button-collapse").sideNav({
    edge: 'right', // Choose the horizontal origin
  });
  $('.parallax').parallax();
  $('.scrollspy').scrollSpy();
  $('#sticky').pushpin(); //{ top:0 });
  $('.carousel').carousel();
  $('.collapsible').collapsible({
    accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });
  $('.slider').slider({
    full_width: false
  });

  // Go Up smoothscroll
  $('#goup').click(function () {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
  });

  // Raised navbar
  $(window).scroll(function () {
    var y = $(window).scrollTop();
    if (y > 0) {
      $("#navbar").removeClass('z-depth-0').addClass('z-depth-1');
    } else if (y == 0) {
      $("#navbar").removeClass('z-depth-1').addClass('z-depth-0');
    } else {
      $("#navbar").removeClass('z-depth-0').addClass('z-depth-1');
    }
  });
};