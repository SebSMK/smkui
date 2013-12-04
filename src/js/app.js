// When the DOM is ready do this...
// http://api.jquery.com/ready/
$(function() {

  /*
   § Remove 300ms touch delay for touch devices.
  \*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // https://github.com/ftlabs/fastclick
  FastClick.attach(document.body);

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
   § Docs navigation
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
  $('a.drawer-toggle').click( function(e) {
    // Prevent default browser behavior for anchors.
    e.preventDefault();

    // If the drawer is open
    if( $('.drawer').hasClass('drawer--open') ) {
      hideDrawer();
    } else {
      // If the drawer is closed
      showDrawer();
    }
  });

}); // When the DOM is ready.


