/*!
 * Main Javascript / jQuery file
 * http://hyuwah.github.io/
 */

 $(document).ready(function() {
   // Materialize jquery initialization
   $(".button-collapse").sideNav({
       edge: 'right', // Choose the horizontal origin
     });
   $('.parallax').parallax();
   $('.scrollspy').scrollSpy();
   $('#sticky').pushpin({ top:0 });
   $('.carousel').carousel();
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
 });
