/*!
 * Main Javascript / jQuery file
 * http://hyuwah.github.io/
 */

// TODO:20 optimisasi skrip transisi page
//

$(document).ready(function () {
  paket();
});

// Copy to clipboard code highlight
// http://stackoverflow.com/a/8024509/1848454
function selectElementContents(el) {
  if (window.getSelection && document.createRange) {
    // IE 9 and non-IE
    var range = document.createRange();
    range.selectNodeContents(el.firstChild.firstChild.firstChild.firstChild.lastChild);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand('copy');
    sel.removeAllRanges();
    Materialize.toast('Copied to clipboard', 3000)
  } else if (document.body.createTextRange) {
    // IE < 9
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el.firstChild.firstChild.firstChild.firstChild.lastChild);
    textRange.select();
    document.execCommand('copy');
    Materialize.toast('Copied to clipboard', 3000)
  }
}

$("html").easeScroll();


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
      blacklist: '.no-smoothState', 
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

          // Fix overlay persist on mobile size
          if(document.getElementById("sidenav-overlay")!=null){
          document.getElementById("sidenav-overlay").remove();
          document.getElementsByTagName("body")[0].style.overflow = "auto";
          }
          
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
  $('.materialboxed').materialbox();
  $('.scrollspy').scrollSpy({});
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

  // From Document.Ready func
  $('.highlight').each(function () {
    var codelang = this.lastChild.firstChild.getAttribute('data-lang').toUpperCase();
    $(this).attr('data-lang', codelang);
  });

  $('.highlight').each(function () {
    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    // for Firefox
    btn.setAttribute('onclick', 'selectElementContents(this.nextSibling);');
    // for IE
    btn.onclick = function () {
      selectElementContents(this.nextSibling)
    };

    btn.setAttribute('style', 'float: right; font-size: 0.8em; margin-right: -40px; background: #fff; border:0;');

    btn.innerHTML = '<i class="fa fa-clipboard tooltipped" data-position="bottom" data-delay="50" data-tooltip="Copy code"></i>';
    this.insertBefore(btn, this.firstChild);
  });
  $('.tooltipped').tooltip({
    delay: 50
  });
  console.log("Document is ready, all function executed")
};