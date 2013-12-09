/*
 § Screen widths
\*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// These corresponds to the variables set in /scss/_settings.scss
var screenXs  =  '300px';
var screenS   =  '700px';
var screenM   = '1000px';
var screenL   = '1300px';
var screenXl  = '1600px';

// When the DOM is ready do this...
// http://api.jquery.com/ready/
$(document).ready(function() {

  /*
   § Make entire element clickable
  \*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $(".clickable").click(function(){
    window.location=$(this).find("a").attr("href");
    return false;
  });

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
    $('body').css('overflow', 'hidden');
    $('.drawer').toggleClass('drawer--open'); // Show drawer
    $('.article, .main-header, .main-footer').css('right', '-' + drawerWidth); // Push page elements aside
    $('.main-header .smkui-logo').toggleClass('active');
  }

  // Hide drawer
  function hideDrawer() {
    $('body').css('overflow', 'visible');
    $('.drawer').toggleClass('drawer--open'); // Show drawer
    $('.article, .main-header, .main-footer').css('right', '0'); // Push page elements aside
    $('.main-header .smkui-logo').toggleClass('active');
  }
  
  // Toggle link
  $('.main-header .smkui-logo').click( function(e) {

    // Using enquire.js to condition trigger based on screen width.
    enquire.register("screen and (max-width:" + screenS + ")", {
      match : function() {
        // Prevent link from directing to the home page.
        e.preventDefault();
        
        // If the drawer is drawer--openpen
        if( $('.drawer').hasClass('drawer--open') ) {
          hideDrawer();
        } else {
          // If the drawer is closed
          showDrawer();
        }
      } // match
    }); // enquire
  }); // click event

  /*
   § Typeahead demo page
  \*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // Being used on /templates/pages/typeahead.hbs
  // https://github.com/twitter/typeahead.js

  // The template engine being used is Mustache.
  // https://github.com/janl/mustache.js
  var ttTemplateNames     = Mustache.compile('<div>{{name}}</div>');
  var ttTemplateCountries = Mustache.compile('<div>{{name}} ({{code}})</div>');
  var ttTemplateStrings   = Mustache.compile('<div>{{title}}</div>');

  // Names
  $('.typeahead-example--names .typeahead').typeahead([
    {
      name: 'names6',
      valueKey: 'name',
      prefetch: {
        url: '../db/names.json',
        ttl: 1 // Time to live in milliseconds
      },
      cache: false,
      template: ttTemplateNames
    }
  ]);

  // Countries
  $('.typeahead-example--countries .typeahead').typeahead([
    {
      name: 'countries6',
      valueKey: 'name',
      prefetch: {
        url: '../db/countries.json',
        ttl: 1 // Time to live in milliseconds
      },
      cache: false,
      template: ttTemplateCountries,
    }
  ]);

  // Strings
  $('.typeahead-example--strings .typeahead').typeahead([
    {
      name: 'strings2',
      valueKey: 'title',
      prefetch: {
        url: '../db/strings.json',
        ttl: 1 // Time to live in milliseconds
      },
      cache: false,
      template: ttTemplateStrings,
    }
  ]);

  /*
   § Search box demo page
  \*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // Strings
  $('.search-box .typeahead').typeahead([
    {
      name: 'strings3',
      valueKey: 'title',
      prefetch: {
        url: '../db/strings.json',
        ttl: 1 // Time to live in milliseconds
      },
      cache: false,
      template: ttTemplateStrings,
    }
  ]);
  
}); // When the DOM is ready.


