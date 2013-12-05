// When the DOM is ready do this...
// http://api.jquery.com/ready/
$(function() {

  /*
   § Screen widths
  \*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // These corresponds to the variables set in _settings.scss
  var screenXs  =  '300px';
  var screenS   =  '700px';
  var screenM   = '1000px';
  var screenL   = '1300px';
  var screenXl  = '1600px';

  /*
   § Remove 300ms touch delay for touch devices.
  \*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // https://github.com/ftlabs/fastclick
  // FastClick.attach(document.body);

  /*
   § Add the class 'current' to links that point to the current url.
  \*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  // Get the current url.
  var currentUrl = location.pathname;
  
  // If the current url is not just '/', add the class 'current' to links with
  // matching hrefs.
  if( currentUrl != '/' ) {
    $('a[href^="' + currentUrl + '"]').addClass('current');
  // If the current url is just '/' add the class 'current' to matching links.
  } else {
    $('a[href="/').addClass('current');
  }

  /*
   § Drawer
  \*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // Configuration
  var drawerWidth = '15em';

  // Show drawer
  function showDrawer() {
    $('.drawer').toggleClass('drawer--open'); // Show drawer
    $('.article, .main-header, .main-footer').css('right', '-' + drawerWidth); // Push page elements aside
  }

  // Hide drawer
  function hideDrawer() {
    $('.drawer').toggleClass('drawer--open'); // Show drawer
    $('.article, .main-header, .main-footer').css('right', '0'); // Push page elements aside
  } 
  
  // Toggle link
  $('.main-header .smkui-logo').click( function(e) {
    // Prevent default browser behavior for anchors.

    // Using enquire.js to condition trigger based on screenwidth.
    enquire.register("screen and (max-width:" + screenS + ")", {
      match : function() {
        // Prevent link from directing to the home page.
        e.preventDefault();
        
        // If the drawer is open
        if( $('.drawer').hasClass('drawer--open') ) {
          hideDrawer();
        } else {
          // If the drawer is closed
          showDrawer();
        }
      }
    }); // enquire
  }); // click event

  
}); // When the DOM is ready.



