/*
 § Rendering artworks
\*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// Using Mustache for templating - https://github.com/janl/mustache.js
// and Masonry for layout - http://masonry.desandro.com/

// Get data and populate template (see src/templates/pages/teasers.hbs)
function renderArtworks() {
  $.getJSON('../db/artworks_1.json', function(data) {
    var template = $('#teaserGridTemplate').html();
    var html = Mustache.to_html(template, data);
    $('#teaser-container-grid').html(html);
  });
}

renderArtworks();

// Initialize Masonry.
$(window).load(function() {
  // Executes when complete page is fully loaded, including all frames, objects
  // and images. This ensures that Masonry knows about elements heights and can
  // do its layouting properly.
  $('#teaser-container-grid').masonry();
});

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
  // $('#teaser-container-grid').masonry();

  /*
   § Frontpage of SMKUI
  \*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // This code is not necessary for any of the SMKUI components. It it purely
  // here to add some cosmetic niceness to the home page of SMKUI.

  // Replace front page image with a desktop friendly version on larger screens.
  enquire.register("screen and (min-width: 500px)", {

      // Replace the home page image if the screen is wider than 500px.
      match : function() {
        $('#home img').attr('src', 'images/frontpage_desktop.jpg');
      },

      // Reverse the above action if the screen is narrower than 500px.
      unmatch : function() {
        $('#home img').attr('src', 'images/frontpage_mobile.jpg');
      }
  });

  /*
   § Colors page
  \*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $(".color").each(function( index ) {
    // Get the content of the color element
    var colorString =  $(this).text();
    // Extract the hex color
    var colorMatch = colorString.match( /#([0-9a-f]{3}|[0-9a-f]{6})$/i );
    // Apply the hex color as a css background
    $(this).css('background-color', colorMatch[0] );
  });

  /*
   § Make entire element clickable
  \*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // $(".clickable").click(function(){
  //   window.location=$(this).find("a").attr("href");
  // }).children("a").click(function(e) {
  //   return false;
  // });


  /*
   § Gallery
  \*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // See src/scss/components/_gallery.scss and src/templates/pages/gallery.hbs
  // for reference.

  // Set current thumbnail by adding a class to the currently viewed thumbnail.
  function setCurrentGalleryThumbnail() {
    var galleryMainImageUrl = $('.gallery__main img').attr('src');

    $('.gallery__thumbnails a').each( function() {
      // First, remove all previously added 'current' classes
      $(this).removeClass('current');

      if( $(this).attr('href') == galleryMainImageUrl ) {
        $(this).addClass('current');
      }
    });
  }

  // Initialize
  setCurrentGalleryThumbnail();

  // When the user clicks a thumbnail
  $('.gallery__thumbnails a').click( function(e) {
    // Prevent the browser from direction away from the page
    e.preventDefault();

    // Get the href of the wrapping <a> tag
    var galleryThumbnailUrl = $(this).attr('href');
    

    // Replace the main image src with the galleryImageUrl
    $('.gallery__main img').attr('src', galleryThumbnailUrl);

    // Set current thumbnail.
    setCurrentGalleryThumbnail();
  });


  /*
   § Cutoff
  \*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // This script is used together with src/scss/components/_cufoff.scss to cut
  // of large chunks of text.

  // Add the 'Show more' link
  $('.cutoff__show-more').click( function(e) {

    e.preventDefault();

    // Show the entire content
    $(this).parent('.cutoff').css('max-height', '9999px');
    $(this).parent('.cutoff').css('padding-bottom', $(this).outerHeight() + 10);
  });

  // Show more when clicking the 'Show more' link


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
  var drawerWidth = '20em';

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
        
        // If the drawer is open
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
   § Chosen
  \*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $('.chosen select').chosen({
    width: "180px"
  });

  // Multiple select
  $('.chosen--multiple select').chosen({
    width: "100%"
  });

  // Multiple select (always open).
  $('.chosen--multiple.chosen--open').each( function() {
    
    // This 'fix' allows the user to see the select options before he has
    // interacted with the select box.
    // 
    // Chosen do not show the contents of the select boxes by default, so we
    // have to show them ourselves. In the code below we loop through the options
    // in the select boxes, adds these to an array, and append each array item
    // to the <ul> called .chosen-results. Chosen uses .chosen-results to show
    // the options.

    var chosenResults = $(this).find('.chosen-results');
    var selectOptions = [];
    
    // Put all select options in an array
    $(this).find('select option').each( function() {
      selectOptions.push( $(this).text() );
    });

    // For each item in the array, append a <li> to .chosen-results
    $.each(selectOptions, function(i, val) {
      if(this != "") {
        chosenResults.append('<li class="active-result" data-option-array-index="' + i + '">' + this + '</li>');
      }
    });
  });

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